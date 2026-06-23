import { hashPassword, comparePassword, generateToken, verifyToken } from '../utils/auth';

describe('Auth Utils', () => {
  describe('Password Hashing', () => {
    it('should hash a password', async () => {
      const password = 'TestPassword123!';
      const hash = await hashPassword(password);

      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(0);
    });

    it('should verify correct password', async () => {
      const password = 'TestPassword123!';
      const hash = await hashPassword(password);

      const isValid = await comparePassword(password, hash);

      expect(isValid).toBe(true);
    });

    it('should reject wrong password', async () => {
      const password = 'TestPassword123!';
      const wrongPassword = 'WrongPassword123!';
      const hash = await hashPassword(password);

      const isValid = await comparePassword(wrongPassword, hash);

      expect(isValid).toBe(false);
    });
  });

  describe('JWT Tokens', () => {
    it('should generate a valid token', () => {
      const token = generateToken(1, 'test@example.com', 'testuser');

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should verify a valid token', () => {
      const token = generateToken(1, 'test@example.com', 'testuser');

      const decoded = verifyToken(token) as any;

      expect(decoded.userId).toBe(1);
      expect(decoded.email).toBe('test@example.com');
      expect(decoded.username).toBe('testuser');
    });

    it('should reject invalid token', () => {
      const invalidToken = 'invalid.token.here';

      expect(() => verifyToken(invalidToken)).toThrow();
    });
  });
});
