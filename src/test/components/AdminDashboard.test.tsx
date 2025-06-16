import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../utils/test-utils';
import AdminDashboard from '../../pages/AdminDashboard';
import {
  mockAdminUser,
  mockAdminData,
  mockBooking,
  mockOnSnapshot,
  mockUpdateDoc,
  mockDeleteDoc,
  mockOnAuthStateChanged,
  mockGetDoc,
  resetFirebaseMocks,
} from '../mocks/firebase';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
  onSnapshot: mockOnSnapshot,
  doc: vi.fn(),
  updateDoc: mockUpdateDoc,
  deleteDoc: mockDeleteDoc,
}));

describe('Admin Dashboard Component Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    resetFirebaseMocks();
    vi.clearAllMocks();

    // Mock admin user
    mockOnAuthStateChanged.mockImplementation((callback) => {
      callback(mockAdminUser);
      return () => {};
    });

    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        ...mockAdminData,
        createdAt: { toDate: () => mockAdminData.createdAt },
      }),
    });
  });

  it('should display booking statistics correctly', async () => {
    const mockBookings = [
      { ...mockBooking, id: '1', status: 'pending' },
      { ...mockBooking, id: '2', status: 'confirmed' },
      { ...mockBooking, id: '3', status: 'cancelled' },
      { ...mockBooking, id: '4', status: 'pending' },
    ];

    mockOnSnapshot.mockImplementation((query, callback) => {
      const mockQuerySnapshot = {
        forEach: (fn: any) => {
          mockBookings.forEach((booking) => {
            fn({
              id: booking.id,
              data: () => ({
                ...booking,
                createdAt: { toDate: () => booking.createdAt },
              }),
            });
          });
        },
      };
      callback(mockQuerySnapshot);
      return () => {};
    });

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('4')).toBeInTheDocument(); // Total
      expect(screen.getByText('2')).toBeInTheDocument(); // Pending
      expect(screen.getByText('1')).toBeInTheDocument(); // Confirmed
      expect(screen.getByText('1')).toBeInTheDocument(); // Cancelled
    });
  });

  it('should filter bookings by status', async () => {
    const mockBookings = [
      { ...mockBooking, id: '1', status: 'pending', name: 'Pending User' },
      { ...mockBooking, id: '2', status: 'confirmed', name: 'Confirmed User' },
    ];

    mockOnSnapshot.mockImplementation((query, callback) => {
      const mockQuerySnapshot = {
        forEach: (fn: any) => {
          mockBookings.forEach((booking) => {
            fn({
              id: booking.id,
              data: () => ({
                ...booking,
                createdAt: { toDate: () => booking.createdAt },
              }),
            });
          });
        },
      };
      callback(mockQuerySnapshot);
      return () => {};
    });

    render(<AdminDashboard />);

    // Wait for bookings to load
    await waitFor(() => {
      expect(screen.getByText('Pending User')).toBeInTheDocument();
      expect(screen.getByText('Confirmed User')).toBeInTheDocument();
    });

    // Filter by pending
    const pendingTab = screen.getByRole('button', { name: /pending/i });
    await user.click(pendingTab);

    expect(screen.getByText('Pending User')).toBeInTheDocument();
    expect(screen.queryByText('Confirmed User')).not.toBeInTheDocument();

    // Filter by confirmed
    const confirmedTab = screen.getByRole('button', { name: /confirmed/i });
    await user.click(confirmedTab);

    expect(screen.queryByText('Pending User')).not.toBeInTheDocument();
    expect(screen.getByText('Confirmed User')).toBeInTheDocument();
  });

  it('should update booking status', async () => {
    mockOnSnapshot.mockImplementation((query, callback) => {
      const mockQuerySnapshot = {
        forEach: (fn: any) => {
          fn({
            id: mockBooking.id,
            data: () => ({
              ...mockBooking,
              status: 'pending',
              createdAt: { toDate: () => mockBooking.createdAt },
            }),
          });
        },
      };
      callback(mockQuerySnapshot);
      return () => {};
    });

    mockUpdateDoc.mockResolvedValue(undefined);

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
    });

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmButton);

    await waitFor(() => {
      expect(mockUpdateDoc).toHaveBeenCalledWith(
        expect.anything(),
        { status: 'confirmed' }
      );
    });
  });

  it('should handle booking deletion with confirmation', async () => {
    mockOnSnapshot.mockImplementation((query, callback) => {
      const mockQuerySnapshot = {
        forEach: (fn: any) => {
          fn({
            id: mockBooking.id,
            data: () => ({
              ...mockBooking,
              createdAt: { toDate: () => mockBooking.createdAt },
            }),
          });
        },
      };
      callback(mockQuerySnapshot);
      return () => {};
    });

    global.confirm = vi.fn(() => true);
    mockDeleteDoc.mockResolvedValue(undefined);

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByTitle('Delete booking')).toBeInTheDocument();
    });

    const deleteButton = screen.getByTitle('Delete booking');
    await user.click(deleteButton);

    await waitFor(() => {
      expect(global.confirm).toHaveBeenCalledWith(
        'Are you sure you want to delete this booking? This action cannot be undone.'
      );
      expect(mockDeleteDoc).toHaveBeenCalled();
    });
  });

  it('should show empty state when no bookings exist', async () => {
    mockOnSnapshot.mockImplementation((query, callback) => {
      const mockQuerySnapshot = {
        forEach: (fn: any) => {
          // No bookings
        },
      };
      callback(mockQuerySnapshot);
      return () => {};
    });

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('No bookings found')).toBeInTheDocument();
      expect(screen.getByText('No booking requests have been submitted yet.')).toBeInTheDocument();
    });
  });
});