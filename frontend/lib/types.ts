export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  avatar_url?: string;
  cover_image_url?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Post {
  id: number;
  user_id: number;
  content: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: Date;
  updated_at: Date;
  username?: string;
  avatar_url?: string;
  liked_by_me?: boolean;
}

export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  username?: string;
  avatar_url?: string;
}

export interface Message {
  id: number;
  sender_id: number;
  recipient_id: number;
  content: string;
  is_read: boolean;
  created_at: Date;
  sender_username?: string;
  recipient_username?: string;
}
