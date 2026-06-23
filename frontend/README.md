# Social Network - Frontend

Next.js 14 + React 18 + TypeScript frontend for Social Network social platform.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Update `NEXT_PUBLIC_API_URL` to match your backend URL.

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

- `/` - Home page
- `/auth/login` - Login page (coming soon)
- `/auth/register` - Registration page (coming soon)
- `/feed` - Main feed (coming soon)
- `/profile/[id]` - User profile (coming soon)
- `/messages` - Direct messages (coming soon)

## Project Structure
```
app/
├── layout.tsx        # Root layout
├── page.tsx          # Home page
├── globals.css       # Global styles
├── auth/             # Auth pages
├── feed/             # Feed pages
└── profile/          # Profile pages

components/
├── shared/           # Shared components
├── auth/             # Auth components
├── posts/            # Post components
└── ui/               # UI components

lib/
├── api.ts            # API client
├── store/            # State management
└── utils/            # Utilities
```

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Key Technologies
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client
- **Socket.io** - Real-time features

## License
MIT