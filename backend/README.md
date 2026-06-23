# Social Network - Backend API

Node.js + Express + TypeScript backend for Social Network social platform.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env` and update values:
```bash
cp .env.example .env
```

### 3. Database Setup
```bash
# Create PostgreSQL database
creatdb social_network

# Run migrations (coming soon)
npm run migrate
```

### 4. Start Development Server
```bash
npm run dev
```

Server runs at `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Authentication (Coming Soon)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users (Coming Soon)
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/posts` - Get user posts

### Posts (Coming Soon)
- `GET /api/posts` - Get feed
- `POST /api/posts` - Create post
- `GET /api/posts/:id` - Get post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comment` - Comment on post

## Project Structure
```
src/
├── index.ts          # Entry point
├── db.ts             # Database connection
├── routes/           # API routes
├── controllers/      # Business logic
├── models/           # Database models
├── middleware/       # Custom middleware
└── utils/            # Utilities
```

## Development Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build
- `npm run typecheck` - Run TypeScript type checking

## License
MIT