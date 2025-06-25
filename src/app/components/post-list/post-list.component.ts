import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/post';
import { User } from '../../models/user';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  users: User[] = [];
  newPost: Post = { title: '', content: '', userId: 1 };

  editingPostId: number | null = null; // ✅ Track which post is being edited
  editedPost: Post = { title: '', content: '', userId: 1 }; // ✅ Local editable copy

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadUsers();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data) => this.posts = data,
      error: (err) => console.error('Failed to fetch posts:', err)
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Failed to fetch users:', err)
    });
  }

  createPost(): void {
    if (!this.newPost.title.trim() || !this.newPost.content.trim()) return;

    this.postService.addPost(this.newPost).subscribe({
      next: () => {
        this.newPost = { title: '', content: '', userId: this.newPost.userId };
        this.loadPosts();
      },
      error: (err) => console.error('Failed to create post:', err)
    });
  }

  deletePost(id: number | undefined): void {
    if (!id) return;
    this.postService.deletePost(id).subscribe({
      next: () => this.loadPosts(),
      error: (err) => console.error('Failed to delete post:', err)
    });
  }

  // ✅ Enter edit mode
  editPost(post: Post): void {
    this.editingPostId = post.id ?? null;
    this.editedPost = { ...post };
  }

  // ✅ Cancel edit mode
  cancelEdit(): void {
    this.editingPostId = null;
  }

  // ✅ Save updated post
  savePost(): void {
    if (!this.editedPost.id) return;

    this.postService.updatePost(this.editedPost).subscribe({
      next: () => {
        this.editingPostId = null;
        this.loadPosts();
      },
      error: (err) => console.error('Failed to update post:', err)
    });
  }
}
