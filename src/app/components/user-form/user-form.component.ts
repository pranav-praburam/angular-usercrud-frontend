import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  newUser: User = {
    name: '',
    email: '',
    age : 0
  };

  constructor(private userService: UserService) {}

  addUser() {
    this.userService.addUser(this.newUser).subscribe(() => {
      alert('User added!');
      this.newUser = { name: '', email: '', age : 0 };
    });
  }
}
