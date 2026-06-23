import request from 'supertest';
import { createApp } from '../../utils/app';

describe('Health Check', () => {
  it('should return health status', async () => {
    const app = createApp();

    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('message');
  });
});
