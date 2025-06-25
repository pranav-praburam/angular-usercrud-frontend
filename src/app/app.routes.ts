import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PostListComponent } from './components/post-list/post-list.component';

export const routes: Routes = [
  { path: '', component: UserFormComponent },       // Default route
  { path: 'users', component: UserListComponent },  // Route for listing users
  { path: 'posts', component: PostListComponent }   // Route for posts
];
