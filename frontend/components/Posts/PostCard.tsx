'use client';

import { useState } from 'react';
import { Post } from '@/lib/types';
import { postAPI } from '@/lib/api';

interface PostCardProps {
  post: Post;
  onLike?: () => void;
  onDelete?: () => void;
}

export default function PostCard({ post, onLike, onDelete }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked_by_me || false);
  const [likeCount, setLikeCount] = useState(post.likes_count);

  const handleLike = async () => {
    try {
      await postAPI.likePost(post.id);
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      onLike?.();
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {post.avatar_url && (
            <img src={post.avatar_url} alt={post.username} className="w-10 h-10 rounded-full mr-3" />
          )}
          <div>
            <p className="font-bold">{post.username}</p>
            <p className="text-gray-500 text-sm">{formatDate(post.created_at)}</p>
          </div>
        </div>
      </div>

      <p className="text-gray-800 mb-4">{post.content}</p>

      {post.image_url && (
        <img src={post.image_url} alt="Post" className="w-full rounded-lg mb-4" />
      )}

      <div className="flex items-center justify-between text-gray-600 border-t pt-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 ${
            liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
          }`}
        >
          <span>❤️</span>
          <span>{likeCount}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-blue-500">
          <span>💬</span>
          <span>{post.comments_count}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-green-500">
          <span>↗️</span>
          <span>{post.shares_count}</span>
        </button>
      </div>
    </div>
  );
}
