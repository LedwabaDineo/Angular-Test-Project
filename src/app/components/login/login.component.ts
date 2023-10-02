import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  loginForm = new FormGroup({
    username: this.username,
    password: this.password
  });

  error!: string;
  private currentUser: any;
  constructor(private authService: AuthService, private router: Router) {}
  
  login(): void {
    if (this.loginForm.valid) {
      const username = this.username.value as string; 
      const password = this.password.value as string; 
      
      this.authService.login(username, password).subscribe({
        next: (success) => {
          if (success) {
            this.currentUser = { username }; 
            this.router.navigate(['/home']);
          } else {
            this.error = 'Invalid username or password';
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      this.error = 'Please fill in all required fields.';
    }
  }
  getCurrentUser(): any {
    return this.currentUser;
  }
}





