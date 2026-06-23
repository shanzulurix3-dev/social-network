import request from 'supertest';
import express, { Express } from 'express';
import { verifyToken } from '../../middleware/auth';
import * as authController from '../../controllers/authController';

jest.mock('../../db');

describe('Auth Controller', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  describe('Register', () => {
    it('should return 400 if required fields are missing', async () => {
      app.post('/register', authController.register);

      const response = await request(app).post('/register').send({
        username: 'testuser',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Login', () => {
    it('should return 400 if credentials are missing', async () => {
      app.post('/login', authController.login);

      const response = await request(app).post('/login').send({
        email: 'test@example.com',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
