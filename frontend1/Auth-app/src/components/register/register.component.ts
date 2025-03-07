import { Component } from '@angular/core';
import { User } from '../../../user.model';
import { RegisterService } from '../../../service/register.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
    styleUrl: './register.component.css',
  imports:[FormsModule]

})
export class RegisterComponent {
  user: User = new User();
  message: string = '';
  loading: boolean = false;

  constructor(private registerService: RegisterService) {}

  onSubmit() {
    if (!this.user.name || !this.user.email || !this.user.password) {
      this.message = 'Please fill out all fields.';
      return;
    }

    this.loading = true;
    this.registerService.registerUser(this.user).subscribe(
      (response: any) => {
        this.message = 'User registered successfully!';
        alert("register sucessfully!!");
        console.log(response);
      },
      (error: any) => {
        this.message = 'An error occurred while registering.';
        console.error(error);
      },
      () => {
        this.loading = false;
      }
    );
  }
}
