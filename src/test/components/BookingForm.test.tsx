import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../utils/test-utils';
import Booking from '../../pages/Booking';
import {
  mockUser,
  mockUserData,
  mockAddDoc,
  mockOnAuthStateChanged,
  mockGetDoc,
  resetFirebaseMocks,
} from '../mocks/firebase';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: mockAddDoc,
  serverTimestamp: vi.fn(() => new Date()),
}));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: mockOnAuthStateChanged,
}));

describe('Booking Form Component Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    resetFirebaseMocks();
    vi.clearAllMocks();

    // Mock authenticated user
    mockOnAuthStateChanged.mockImplementation((callback) => {
      callback(mockUser);
      return () => {};
    });

    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        ...mockUserData,
        createdAt: { toDate: () => mockUserData.createdAt },
      }),
    });
  });

  it('should auto-fill email from authenticated user', async () => {
    render(<Booking />);

    await waitFor(() => {
      const emailInput = screen.getByDisplayValue('test@example.com');
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('readonly');
    });
  });

  it('should validate required fields', async () => {
    render(<Booking />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /book mark for your event/i })).toBeInTheDocument();
    });

    // Try to submit without filling required fields
    const submitButton = screen.getByRole('button', { name: /submit booking request/i });
    await user.click(submitButton);

    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining('Please fill in all required fields')
    );
  });

  it('should handle optional fields correctly', async () => {
    mockAddDoc.mockResolvedValue({ id: 'test-booking' });

    render(<Booking />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /book mark for your event/i })).toBeInTheDocument();
    });

    // Fill only required fields
    await user.type(screen.getByPlaceholderText(/your full name/i), 'Test User');
    await user.type(screen.getByPlaceholderText(/your company name/i), 'Test Company');
    await user.selectOptions(screen.getByDisplayValue(''), 'Keynote Speaking');
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    await user.type(screen.getByDisplayValue(''), futureDate.toISOString().split('T')[0]);
    
    await user.type(screen.getByPlaceholderText(/city, province or virtual/i), 'Test Location');
    await user.type(screen.getByPlaceholderText(/tell us about your event/i), 'Test description');

    // Add some optional fields
    await user.type(screen.getByPlaceholderText(/\+27 82 123 4567/i), '+27 82 999 8888');
    await user.selectOptions(screen.getByDisplayValue(''), '14:00');

    const submitButton = screen.getByRole('button', { name: /submit booking request/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockAddDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          name: 'Test User',
          email: 'test@example.com',
          phone: '+27 82 999 8888',
          company: 'Test Company',
          eventType: 'Keynote Speaking',
          eventTime: '14:00',
          location: 'Test Location',
          description: 'Test description',
        })
      );
    });
  });

  it('should prevent past dates', async () => {
    render(<Booking />);

    await waitFor(() => {
      const dateInput = screen.getByDisplayValue('');
      const today = new Date().toISOString().split('T')[0];
      expect(dateInput).toHaveAttribute('min', today);
    });
  });

  it('should show success message after submission', async () => {
    mockAddDoc.mockResolvedValue({ id: 'test-booking' });

    render(<Booking />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /book mark for your event/i })).toBeInTheDocument();
    });

    // Fill required fields
    await user.type(screen.getByPlaceholderText(/your full name/i), 'Success Test');
    await user.type(screen.getByPlaceholderText(/your company name/i), 'Success Company');
    await user.selectOptions(screen.getByDisplayValue(''), 'Workshop Facilitation');
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 14);
    await user.type(screen.getByDisplayValue(''), futureDate.toISOString().split('T')[0]);
    
    await user.type(screen.getByPlaceholderText(/city, province or virtual/i), 'Success Location');
    await user.type(screen.getByPlaceholderText(/tell us about your event/i), 'Success description');

    const submitButton = screen.getByRole('button', { name: /submit booking request/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        'Thank you for your booking request! Mark will get back to you within 24 hours.'
      );
    });
  });
});