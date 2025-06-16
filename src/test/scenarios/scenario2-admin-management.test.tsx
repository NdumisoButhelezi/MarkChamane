import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../utils/test-utils';
import App from '../../App';
import {
  mockAdminUser,
  mockAdminData,
  mockBooking,
  mockSignInWithEmailAndPassword,
  mockGetDoc,
  mockOnSnapshot,
  mockUpdateDoc,
  mockDeleteDoc,
  mockOnAuthStateChanged,
  resetFirebaseMocks,
} from '../mocks/firebase';

// Mock Firebase functions
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: mockOnAuthStateChanged,
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: mockGetDoc,
  setDoc: vi.fn(),
  collection: vi.fn(),
  addDoc: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
  onSnapshot: mockOnSnapshot,
  updateDoc: mockUpdateDoc,
  deleteDoc: mockDeleteDoc,
  serverTimestamp: vi.fn(() => new Date()),
}));

describe('Scenario 2: Admin Management', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    resetFirebaseMocks();
    vi.clearAllMocks();
  });

  it('should complete the full admin management flow', async () => {
    // Step 1: Mock successful admin login
    mockSignInWithEmailAndPassword.mockResolvedValue({
      user: mockAdminUser,
    });

    // Step 2: Mock auth state change
    mockOnAuthStateChanged.mockImplementation((callback) => {
      callback(mockAdminUser);
      return () => {};
    });

    // Step 3: Mock admin user data fetch
    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        ...mockAdminData,
        createdAt: { toDate: () => mockAdminData.createdAt },
      }),
    });

    // Step 4: Mock bookings data
    const mockBookings = [
      { ...mockBooking, id: 'booking-1', status: 'pending' },
      { ...mockBooking, id: 'booking-2', status: 'confirmed', name: 'Jane Smith' },
      { ...mockBooking, id: 'booking-3', status: 'cancelled', name: 'Bob Johnson' },
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

    render(<App />);

    // Step 1: Navigate to login page
    const loginLink = screen.getByRole('link', { name: /login/i });
    await user.click(loginLink);

    // Step 2: Login as admin
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /sign in to your account/i })).toBeInTheDocument();
    });

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'admin@example.com');
    await user.type(passwordInput, 'adminpassword');
    await user.click(signInButton);

    // Step 3: Verify login was called
    await waitFor(() => {
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'admin@example.com',
        'adminpassword'
      );
    });

    // Step 4: Navigate to admin dashboard
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /admin/i })).toBeInTheDocument();
    });

    const adminLink = screen.getByRole('link', { name: /admin/i });
    await user.click(adminLink);

    // Step 5: Verify dashboard loads with statistics
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /admin dashboard/i })).toBeInTheDocument();
    });

    // Check statistics cards
    expect(screen.getByText('3')).toBeInTheDocument(); // Total bookings
    expect(screen.getByText('1')).toBeInTheDocument(); // Pending
    expect(screen.getByText('1')).toBeInTheDocument(); // Confirmed
    expect(screen.getByText('1')).toBeInTheDocument(); // Cancelled

    // Step 6: Test filter functionality
    const pendingTab = screen.getByRole('button', { name: /pending/i });
    await user.click(pendingTab);

    // Should show only pending bookings
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();

    // Step 7: Test view booking details modal
    const viewButtons = screen.getAllByTitle('View details');
    await user.click(viewButtons[0]);

    // Verify modal opens with booking details
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /booking details/i })).toBeInTheDocument();
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('+27 82 123 4567')).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /booking details/i })).not.toBeInTheDocument();
    });

    // Step 8: Test booking status change (confirm)
    mockUpdateDoc.mockResolvedValue(undefined);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmButton);

    await waitFor(() => {
      expect(mockUpdateDoc).toHaveBeenCalledWith(
        expect.anything(),
        { status: 'confirmed' }
      );
    });

    // Step 9: Switch to all bookings and test cancel functionality
    const allTab = screen.getByRole('button', { name: /all bookings/i });
    await user.click(allTab);

    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    // Find a confirmed booking and cancel it
    const cancelButtons = screen.getAllByRole('button', { name: /cancel/i });
    if (cancelButtons.length > 0) {
      await user.click(cancelButtons[0]);

      await waitFor(() => {
        expect(mockUpdateDoc).toHaveBeenCalledWith(
          expect.anything(),
          { status: 'cancelled' }
        );
      });
    }

    // Step 10: Test delete booking
    mockDeleteDoc.mockResolvedValue(undefined);
    global.confirm = vi.fn(() => true);

    const deleteButtons = screen.getAllByTitle('Delete booking');
    await user.click(deleteButtons[0]);

    await waitFor(() => {
      expect(global.confirm).toHaveBeenCalledWith(
        'Are you sure you want to delete this booking? This action cannot be undone.'
      );
      expect(mockDeleteDoc).toHaveBeenCalled();
    });
  });

  it('should handle modal interactions correctly', async () => {
    // Mock admin user and bookings
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

    render(<App />);

    // Navigate to admin dashboard
    const adminLink = screen.getByRole('link', { name: /admin/i });
    await user.click(adminLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /admin dashboard/i })).toBeInTheDocument();
    });

    // Open modal
    const viewButton = screen.getByTitle('View details');
    await user.click(viewButton);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /booking details/i })).toBeInTheDocument();
    });

    // Test closing modal with X button
    const xButton = screen.getByRole('button', { name: '' }); // X button typically has no text
    await user.click(xButton);

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /booking details/i })).not.toBeInTheDocument();
    });

    // Open modal again
    await user.click(viewButton);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /booking details/i })).toBeInTheDocument();
    });

    // Test closing modal by clicking outside (simulate escape key)
    await user.keyboard('{Escape}');

    // Note: In a real test, you might need to simulate clicking outside the modal
    // For now, we'll test the close button functionality
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /booking details/i })).not.toBeInTheDocument();
    });
  });

  it('should prevent non-admin users from accessing admin dashboard', async () => {
    // Mock regular user
    const regularUser = { ...mockAdminUser, uid: 'regular-user-123' };
    const regularUserData = { ...mockAdminData, role: 'user' as const };

    mockOnAuthStateChanged.mockImplementation((callback) => {
      callback(regularUser);
      return () => {};
    });

    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        ...regularUserData,
        createdAt: { toDate: () => regularUserData.createdAt },
      }),
    });

    render(<App />);

    // Regular user should not see admin link
    await waitFor(() => {
      expect(screen.queryByRole('link', { name: /admin/i })).not.toBeInTheDocument();
    });

    // If they somehow navigate to /admin, they should be redirected
    // This would be tested with actual routing in a more complete test
  });

  it('should handle delete confirmation dialog', async () => {
    // Mock admin user and bookings
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

    render(<App />);

    // Navigate to admin dashboard
    const adminLink = screen.getByRole('link', { name: /admin/i });
    await user.click(adminLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /admin dashboard/i })).toBeInTheDocument();
    });

    // Test delete cancellation
    global.confirm = vi.fn(() => false);
    
    const deleteButton = screen.getByTitle('Delete booking');
    await user.click(deleteButton);

    expect(global.confirm).toHaveBeenCalled();
    expect(mockDeleteDoc).not.toHaveBeenCalled();

    // Test delete confirmation
    global.confirm = vi.fn(() => true);
    mockDeleteDoc.mockResolvedValue(undefined);
    
    await user.click(deleteButton);

    await waitFor(() => {
      expect(global.confirm).toHaveBeenCalled();
      expect(mockDeleteDoc).toHaveBeenCalled();
    });
  });
});