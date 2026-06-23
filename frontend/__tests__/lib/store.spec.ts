import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../store';

// Clear localStorage before each test
beforeEach(() => {
  localStorage.clear();
});

describe('Auth Store', () => {
  it('should initialize with null user and token', () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });

  it('should set auth when setAuth is called', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const mockToken = 'mock-jwt-token';

    act(() => {
      result.current.setAuth(mockUser, mockToken);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.token).toBe(mockToken);
    expect(localStorage.getItem('authToken')).toBe(mockToken);
  });

  it('should logout and clear data', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    act(() => {
      result.current.setAuth(mockUser, 'token');
    });

    expect(result.current.user).not.toBeNull();

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(localStorage.getItem('authToken')).toBeNull();
  });
});
