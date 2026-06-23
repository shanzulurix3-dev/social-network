'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...');

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
        const data = await response.json();
        setApiStatus(data.message || 'API Connected');
      } catch (error) {
        setApiStatus('API Connection Failed');
      }
    };

    checkAPI();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Social Network</h1>
        <p className="text-xl text-blue-100 mb-8">Connect, Share, and Grow Together</p>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-gray-700 mb-4">API Status: <span className="font-bold text-blue-600">{apiStatus}</span></p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
            Get Started
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">🤝 Connect</h3>
            <p>Find and follow friends</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">📝 Share</h3>
            <p>Post your thoughts and moments</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">💬 Engage</h3>
            <p>Like, comment, and discuss</p>
          </div>
        </div>
      </div>
    </main>
  );
}