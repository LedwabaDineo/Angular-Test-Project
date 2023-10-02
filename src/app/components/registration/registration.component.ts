import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  register(): void {
    if (this.registrationForm.valid) {
      const newUser = this.registrationForm.value;
      this.registrationService.addUser(newUser).subscribe((newUser) => {
        console.log('User added:', newUser);
        this.router.navigate(['/login']);
      });
    }
  }
  

  cancel(): void {
    this.router.navigate(['/login']);
  }
}
