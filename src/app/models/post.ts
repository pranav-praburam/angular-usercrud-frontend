export interface Post {
    id?: number;
    title: string;
    content: string;
    userId?: number; // still used for submitting new posts
    user?: {
      id: number;
      name: string;
      email?: string;
      age?: number;
    };
  }
  