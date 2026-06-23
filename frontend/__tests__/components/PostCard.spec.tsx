import React from 'react';
import { render, screen } from '@testing-library/react';
import PostCard from '../../components/Posts/PostCard';
import { Post } from '@/lib/types';

jest.mock('@/lib/api');

const mockPost: Post = {
  id: 1,
  user_id: 1,
  content: 'Test post content',
  image_url: undefined,
  likes_count: 5,
  comments_count: 2,
  shares_count: 1,
  created_at: new Date('2024-01-01'),
  updated_at: new Date('2024-01-01'),
  username: 'testuser',
  avatar_url: 'https://example.com/avatar.jpg',
  liked_by_me: false,
};

describe('PostCard Component', () => {
  it('should render post content', () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText('Test post content')).toBeInTheDocument();
  });

  it('should display username', () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('should show like count', () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should show comment count', () => {
    render(<PostCard post={mockPost} />);

    const commentCounts = screen.getAllByText('2');
    expect(commentCounts.length).toBeGreaterThan(0);
  });

  it('should display avatar image', () => {
    render(<PostCard post={mockPost} />);

    const avatar = screen.getByAltText('testuser');
    expect(avatar).toHaveAttribute('src', mockPost.avatar_url);
  });
});
