'use client';

import LoginForm from '@/components/Auth/LoginForm';
import Navigation from '@/components/Navigation';

export default function LoginPage() {
  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <LoginForm />
      </div>
    </div>
  );
}
