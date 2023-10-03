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

  // Define the default registration object with empty values
  defaultRegistration = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    identityNumber: '',
    mobileNumber: '',
    gender: '',
    maritalStatus: '',
    address: {
      line1: '',
      line2: '',
      line3: '',
      suburb: '',
      city: '',
      postalCode: '',
      country: '',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: [''],
      identityNumber: [''],
      mobileNumber: [''],
      gender: [''],
      maritalStatus: [''],
      address: this.formBuilder.group({
        line1: [''],
        line2: [''],
        line3: [''],
        suburb: [''],
        city: [''],
        postalCode: [''],
        country: [''],
      }),
    });
  }

  register(): void {
    if (this.registrationForm.valid) {
      const newUser = {
        ...this.defaultRegistration,
        ...this.registrationForm.value, 
      };

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
