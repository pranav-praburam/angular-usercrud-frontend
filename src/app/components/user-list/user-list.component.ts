import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>All Users</h2>
    <ul>
      <li *ngFor="let user of users">
        <strong>{{ user.name }}</strong>
        - {{ user.email }}
        - Age: {{ user.age }}
        - <em>User ID: {{ user.id }}</em>
        <button (click)="editUser(user)">Edit</button>
        <button (click)="deleteUser(user.id)">Delete</button>
      </li>
    </ul>

    <hr *ngIf="editingUser" />
    <h3 *ngIf="editingUser">Edit User</h3>
    <form *ngIf="editingUser" (ngSubmit)="updateUser()" #editForm="ngForm">
      <input
        type="text"
        [(ngModel)]="editingUser.name"
        name="name"
        required
        placeholder="Name"
      />
      <input
        type="email"
        [(ngModel)]="editingUser.email"
        name="email"
        required
        placeholder="Email"
      />
      <input
        type="number"
        [(ngModel)]="editingUser.age"
        name="age"
        required
        placeholder="Age"
      />
      <button type="submit" [disabled]="editForm.invalid">Update</button>
      <button type="button" (click)="cancelEdit()">Cancel</button>
    </form>
  `,
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  editingUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addUser(user: User): void {
    this.userService.addUser(user).subscribe(() => {
      this.getAllUsers();
    });
  }

  deleteUser(id: number | undefined): void {
    if (!id) return;
    this.userService.deleteUser(id).subscribe({
      next: () => this.getAllUsers(),
      error: (err) => console.error('Failed to delete user:', err)
    });
  }

  editUser(user: User): void {
    this.editingUser = { ...user }; // Clone to avoid mutating the original
  }

  cancelEdit(): void {
    this.editingUser = null;
  }

  updateUser(): void {
    if (!this.editingUser || !this.editingUser.id) return;

    this.userService.updateUser(this.editingUser.id, this.editingUser).subscribe({
      next: () => {
        this.editingUser = null;
        this.getAllUsers();
      },
      error: (err) => console.error('Failed to update user:', err)
    });
  }
}
