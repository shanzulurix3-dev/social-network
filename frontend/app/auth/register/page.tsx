'use client';

import RegisterForm from '@/components/Auth/RegisterForm';
import Navigation from '@/components/Navigation';

export default function RegisterPage() {
  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <RegisterForm />
      </div>
    </div>
  );
}
