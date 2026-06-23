'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { postAPI } from '@/lib/api';
import Navigation from '@/components/Navigation';
import CreatePost from '@/components/Posts/CreatePost';
import PostCard from '@/components/Posts/PostCard';
import { Post } from '@/lib/types';

export default function FeedPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    loadFeed();
  }, [user, router]);

  const loadFeed = async () => {
    try {
      const response = await postAPI.getFeed();
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to load feed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <Navigation />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <CreatePost onPostCreated={loadFeed} />
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
