import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePost from '../../components/Posts/CreatePost';
import * as postAPI from '@/lib/api';

jest.mock('@/lib/api');

describe('CreatePost Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render create post form', () => {
    render(<CreatePost />);

    expect(screen.getByText("What's on your mind?")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Share your thoughts...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
  });

  it('should disable button when textarea is empty', () => {
    render(<CreatePost />);

    const button = screen.getByRole('button', { name: /post/i });
    expect(button).toBeDisabled();
  });

  it('should enable button when text is entered', () => {
    render(<CreatePost />);

    const textarea = screen.getByPlaceholderText('Share your thoughts...');
    fireEvent.change(textarea, { target: { value: 'Hello world' } });

    const button = screen.getByRole('button', { name: /post/i });
    expect(button).not.toBeDisabled();
  });

  it('should call createPost API on submit', async () => {
    (postAPI.postAPI.createPost as jest.Mock).mockResolvedValue({ data: { id: 1 } });

    const onPostCreated = jest.fn();
    render(<CreatePost onPostCreated={onPostCreated} />);

    const textarea = screen.getByPlaceholderText('Share your thoughts...');
    fireEvent.change(textarea, { target: { value: 'Test post' } });
    fireEvent.click(screen.getByRole('button', { name: /post/i }));

    await waitFor(() => {
      expect(postAPI.postAPI.createPost).toHaveBeenCalledWith({ content: 'Test post' });
      expect(onPostCreated).toHaveBeenCalled();
    });
  });

  it('should show error message on failure', async () => {
    (postAPI.postAPI.createPost as jest.Mock).mockRejectedValue({
      response: {
        data: { error: 'Failed to create post' },
      },
    });

    render(<CreatePost />);

    const textarea = screen.getByPlaceholderText('Share your thoughts...');
    fireEvent.change(textarea, { target: { value: 'Test post' } });
    fireEvent.click(screen.getByRole('button', { name: /post/i }));

    await waitFor(() => {
      expect(screen.getByText('Failed to create post')).toBeInTheDocument();
    });
  });
});
