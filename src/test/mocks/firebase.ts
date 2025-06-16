import { vi } from 'vitest';

// Mock user data
export const mockUser = {
  uid: 'test-user-123',
  email: 'test@example.com',
  emailVerified: true,
};

export const mockAdminUser = {
  uid: 'admin-user-123',
  email: 'admin@example.com',
  emailVerified: true,
};

export const mockUserData = {
  uid: 'test-user-123',
  email: 'test@example.com',
  role: 'user' as const,
  createdAt: new Date(),
};

export const mockAdminData = {
  uid: 'admin-user-123',
  email: 'admin@example.com',
  role: 'admin' as const,
  createdAt: new Date(),
};

export const mockBooking = {
  id: 'booking-123',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+27 82 123 4567',
  company: 'Test Company',
  eventType: 'Keynote Speaking',
  eventDate: '2024-12-25',
  eventTime: '14:00',
  duration: '1 hour',
  attendees: '50-100',
  location: 'Cape Town',
  description: 'Test event description',
  budget: 'R25,000 - R50,000',
  status: 'pending' as const,
  createdAt: new Date(),
  userId: 'test-user-123',
};

// Firebase Auth mocks
export const mockSignInWithEmailAndPassword = vi.fn();
export const mockCreateUserWithEmailAndPassword = vi.fn();
export const mockSignOut = vi.fn();
export const mockOnAuthStateChanged = vi.fn();

// Firebase Firestore mocks
export const mockGetDoc = vi.fn();
export const mockSetDoc = vi.fn();
export const mockAddDoc = vi.fn();
export const mockUpdateDoc = vi.fn();
export const mockDeleteDoc = vi.fn();
export const mockOnSnapshot = vi.fn();

// Reset all mocks
export const resetFirebaseMocks = () => {
  mockSignInWithEmailAndPassword.mockReset();
  mockCreateUserWithEmailAndPassword.mockReset();
  mockSignOut.mockReset();
  mockOnAuthStateChanged.mockReset();
  mockGetDoc.mockReset();
  mockSetDoc.mockReset();
  mockAddDoc.mockReset();
  mockUpdateDoc.mockReset();
  mockDeleteDoc.mockReset();
  mockOnSnapshot.mockReset();
};