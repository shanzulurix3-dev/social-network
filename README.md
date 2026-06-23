# Social Network

A full-stack social network web application built with Next.js, Node.js/Express, PostgreSQL, and TypeScript.

## Project Structure

```
social-network/
├── frontend/          # Next.js React app
├── backend/           # Node.js Express API
└── docs/             # Documentation
```

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Real-time:** Socket.io (for messaging, notifications)

## Features (Coming Soon)

- User authentication & profiles
- Create & browse posts
- Like, comment, share posts
- Follow/unfollow users
- Direct messaging
- Notifications
- User search

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

See individual README files in `frontend/` and `backend/` directories for detailed setup instructions.

## Development

Start both frontend and backend servers:

```bash
# Terminal 1 - Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend: http://localhost:3000
Backend API: http://localhost:5000

## License

MIT