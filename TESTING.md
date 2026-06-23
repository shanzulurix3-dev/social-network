# Testing Guide

This project includes comprehensive testing setup for both backend and frontend.

## Backend Testing

### Setup
```bash
cd backend
npm install
```

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Files Structure
```
backend/
├── src/
│   ├── __tests__/          # Test files
│   │   ├── auth.spec.ts
│   │   ├── auth.controller.spec.ts
│   │   ├── middleware.spec.ts
│   │   └── health.spec.ts
│   ├── __mocks__/          # Mock data
│   │   └── db.ts
│   └── ...
└── jest.config.js          # Jest configuration
```

### What's Tested

**Unit Tests:**
- Authentication utilities (password hashing, token generation)
- Auth middleware (token verification)
- Auth controller (register, login validation)

**Integration Tests:**
- Health check endpoint
- Auth flow validation

### Example Test
```typescript
import { hashPassword, comparePassword } from '../utils/auth';

describe('Auth Utils', () => {
  it('should hash a password', async () => {
    const password = 'TestPassword123!';
    const hash = await hashPassword(password);
    
    expect(hash).not.toBe(password);
    expect(await comparePassword(password, hash)).toBe(true);
  });
});
```

## Frontend Testing

### Setup
```bash
cd frontend
npm install
```

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Files Structure
```
frontend/
├── __tests__/              # Test files
│   ├── lib/
│   │   └── store.spec.ts
│   └── components/
│       ├── PostCard.spec.tsx
│       ├── LoginForm.spec.tsx
│       └── CreatePost.spec.tsx
├── jest.config.js          # Jest configuration
└── jest.setup.js           # Jest setup file
```

### What's Tested

**Component Tests:**
- LoginForm (rendering, error handling, submission)
- CreatePost (form validation, API calls, error states)
- PostCard (displaying post data, engagement buttons)

**Store Tests:**
- Auth store initialization
- Setting/clearing auth state
- Logout functionality

### Example Component Test
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../../components/Auth/LoginForm';

describe('LoginForm', () => {
  it('should render login form', () => {
    render(<LoginForm />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should show error on login failure', async () => {
    render(<LoginForm />);
    // ... test code
  });
});
```

## Coverage Reports

After running tests with coverage, open the report:

**Backend:**
```bash
open backend/coverage/lcov-report/index.html
```

**Frontend:**
```bash
open frontend/coverage/lcov-report/index.html
```

## Best Practices

### Backend
- Write tests for business logic (auth, validation)
- Mock external dependencies (database, APIs)
- Test both success and failure cases
- Aim for 70%+ coverage

### Frontend
- Test user interactions (clicks, form submissions)
- Mock API calls
- Test component rendering and state changes
- Use `@testing-library/react` for user-centric tests
- Avoid testing implementation details

## Common Test Patterns

### Testing API Calls
```typescript
jest.mock('@/lib/api');

it('should call API on submit', async () => {
  (authAPI.login as jest.Mock).mockResolvedValue({ data: { token: '123' } });
  
  render(<LoginForm />);
  // ... interact with form
  
  await waitFor(() => {
    expect(authAPI.login).toHaveBeenCalledWith({ email, password });
  });
});
```

### Testing async State Changes
```typescript
it('should update state after async operation', async () => {
  render(<Component />);
  
  fireEvent.click(screen.getByRole('button'));
  
  await waitFor(() => {
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
```

### Testing Error States
```typescript
it('should show error message', async () => {
  (api.call as jest.Mock).mockRejectedValue(new Error('Failed'));
  
  render(<Component />);
  // ... trigger error
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

## CI/CD Integration

Add tests to your CI/CD pipeline (GitHub Actions, etc.):

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test -- --coverage
```

## Debugging Tests

### Debug a Single Test
```bash
npm test -- --testNamePattern="should hash a password"
```

### Debug in VS Code
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal"
}
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library React](https://testing-library.com/react)
- [Supertest](https://github.com/visionmedia/supertest)
- [ts-jest](https://kulshekhar.github.io/ts-jest/)
