import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../utils/test-utils';
import App from '../../App';
import {
  mockUser,
  mockUserData,
  mockCreateUserWithEmailAndPassword,
  mockSignInWithEmailAndPassword,
  mockGetDoc,
  mockSetDoc,
  mockAddDoc,
  mockOnAuthStateChanged,
  resetFirebaseMocks,
} from '../mocks/firebase';

// Mock Firebase functions
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
  signOut: vi.fn(),
  onAuthStateChanged: mockOnAuthStateChanged,
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: mockGetDoc,
  setDoc: mockSetDoc,
  collection: vi.fn(),
  addDoc: mockAddDoc,
  query: vi.fn(),
  orderBy: vi.fn(),
  onSnapshot: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  serverTimestamp: vi.fn(() => new Date()),
}));

describe('Scenario 1: New User Books Event', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    resetFirebaseMocks();
    vi.clearAllMocks();
  });

  it('should complete the full booking flow for a new user', async () => {
    // Step 1: Mock successful registration
    mockCreateUserWithEmailAndPassword.mockResolvedValue({
      user: mockUser,
    });
    mockSetDoc.mockResolvedValue(undefined);

    // Step 2: Mock auth state change to simulate login
    mockOnAuthStateChanged.mockImplementation((callback) => {
      callback(mockUser);
      return () => {};
    });

    // Step 3: Mock user data fetch
    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        ...mockUserData,
        createdAt: { toDate: () => mockUserData.createdAt },
      }),
    });

    // Step 4: Mock successful booking submission
    mockAddDoc.mockResolvedValue({ id: 'booking-123' });

    // Render the app
    render(<App />);

    // Step 1: Navigate to register page
    const registerLink = screen.getByRole('link', { name: /register/i });
    await user.click(registerLink);

    // Step 2: Fill out registration form
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
    });

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm your password/i);
    const roleSelect = screen.getByDisplayValue(/user \(book events\)/i);
    const createAccountButton = screen.getByRole('button', { name: /create account/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'password123');
    await user.selectOptions(roleSelect, 'user');
    await user.click(createAccountButton);

    // Step 3: Verify registration was called
    await waitFor(() => {
      expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(mockSetDoc).toHaveBeenCalled();
    });

    // Step 4: Navigate to booking page (should be redirected after registration)
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /book event/i })).toBeInTheDocument();
    });

    const bookEventLink = screen.getByRole('link', { name: /book event/i });
    await user.click(bookEventLink);

    // Step 5: Verify booking form loads with auto-filled email
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /book mark for your event/i })).toBeInTheDocument();
    });

    const autoFilledEmail = screen.getByDisplayValue('test@example.com');
    expect(autoFilledEmail).toBeInTheDocument();
    expect(autoFilledEmail).toHaveAttribute('readonly');

    // Step 6: Fill out booking form
    const nameInput = screen.getByPlaceholderText(/your full name/i);
    const phoneInput = screen.getByPlaceholderText(/\+27 82 123 4567/i);
    const companyInput = screen.getByPlaceholderText(/your company name/i);
    const eventTypeSelect = screen.getByDisplayValue('');
    const eventDateInput = screen.getByDisplayValue('');
    const locationInput = screen.getByPlaceholderText(/city, province or virtual/i);
    const descriptionTextarea = screen.getByPlaceholderText(/tell us about your event/i);

    await user.type(nameInput, 'John Doe');
    await user.type(phoneInput, '+27 82 123 4567');
    await user.type(companyInput, 'Test Company');
    await user.selectOptions(eventTypeSelect, 'Keynote Speaking');
    
    // Set future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const futureDateString = futureDate.toISOString().split('T')[0];
    await user.type(eventDateInput, futureDateString);
    
    await user.type(locationInput, 'Cape Town');
    await user.type(descriptionTextarea, 'Test event description for automated testing');

    // Step 7: Submit booking form
    const submitButton = screen.getByRole('button', { name: /submit booking request/i });
    await user.click(submitButton);

    // Step 8: Verify booking submission
    await waitFor(() => {
      expect(mockAddDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          name: 'John Doe',
          email: 'test@example.com',
          phone: '+27 82 123 4567',
          company: 'Test Company',
          eventType: 'Keynote Speaking',
          eventDate: futureDateString,
          location: 'Cape Town',
          description: 'Test event description for automated testing',
          userId: mockUser.uid,
          status: 'pending',
        })
      );
    });

    // Step 9: Verify success message
    expect(global.alert).toHaveBeenCalledWith(
      'Thank you for your booking request! Mark will get back to you within 24 hours.'
    );
  });

  it('should validate required fields in booking form', async () => {
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

    render(<App />);

    // Navigate to booking page
    const bookEventLink = screen.getByRole('link', { name: /book event/i });
    await user.click(bookEventLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /book mark for your event/i })).toBeInTheDocument();
    });

    // Try to submit form without required fields
    const submitButton = screen.getByRole('button', { name: /submit booking request/i });
    await user.click(submitButton);

    // Verify validation alert
    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining('Please fill in all required fields')
    );

    // Verify booking was not submitted
    expect(mockAddDoc).not.toHaveBeenCalled();
  });

  it('should handle optional fields correctly', async () => {
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

    mockAddDoc.mockResolvedValue({ id: 'booking-123' });

    render(<App />);

    // Navigate to booking page
    const bookEventLink = screen.getByRole('link', { name: /book event/i });
    await user.click(bookEventLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /book mark for your event/i })).toBeInTheDocument();
    });

    // Fill only required fields
    const nameInput = screen.getByPlaceholderText(/your full name/i);
    const companyInput = screen.getByPlaceholderText(/your company name/i);
    const eventTypeSelect = screen.getByDisplayValue('');
    const eventDateInput = screen.getByDisplayValue('');
    const locationInput = screen.getByPlaceholderText(/city, province or virtual/i);
    const descriptionTextarea = screen.getByPlaceholderText(/tell us about your event/i);

    await user.type(nameInput, 'Jane Doe');
    await user.type(companyInput, 'Required Company');
    await user.selectOptions(eventTypeSelect, 'Workshop Facilitation');
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 15);
    const futureDateString = futureDate.toISOString().split('T')[0];
    await user.type(eventDateInput, futureDateString);
    
    await user.type(locationInput, 'Johannesburg');
    await user.type(descriptionTextarea, 'Required description only');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /submit booking request/i });
    await user.click(submitButton);

    // Verify booking was submitted with only required fields
    await waitFor(() => {
      expect(mockAddDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          name: 'Jane Doe',
          email: 'test@example.com',
          company: 'Required Company',
          eventType: 'Workshop Facilitation',
          eventDate: futureDateString,
          location: 'Johannesburg',
          description: 'Required description only',
          userId: mockUser.uid,
          status: 'pending',
        })
      );
    });

    // Verify optional fields are not included when empty
    const callArgs = mockAddDoc.mock.calls[0][1];
    expect(callArgs).not.toHaveProperty('phone');
    expect(callArgs).not.toHaveProperty('eventTime');
    expect(callArgs).not.toHaveProperty('duration');
    expect(callArgs).not.toHaveProperty('attendees');
    expect(callArgs).not.toHaveProperty('budget');
  });

  it('should prevent past dates in event date field', async () => {
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

    render(<App />);

    // Navigate to booking page
    const bookEventLink = screen.getByRole('link', { name: /book event/i });
    await user.click(bookEventLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /book mark for your event/i })).toBeInTheDocument();
    });

    // Check that date input has min attribute set to today
    const eventDateInput = screen.getByDisplayValue('');
    const today = new Date().toISOString().split('T')[0];
    expect(eventDateInput).toHaveAttribute('min', today);
  });
});