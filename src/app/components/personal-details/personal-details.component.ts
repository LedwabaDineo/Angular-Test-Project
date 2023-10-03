import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PersonalDetailsService } from 'src/app/services/personal-details.service';
import { PersonalDetails } from 'src/app/models/personal-details.model';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  isEditMode: boolean = false;
  user: PersonalDetails = {
    username: '',
    firstName: '',
    lastName: '',
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
  
  editedUser: PersonalDetails = {} as PersonalDetails;
  

  constructor(private userService: PersonalDetailsService, private authService: AuthService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        if (response && typeof response === 'object' && response.hasOwnProperty('username')) {
          this.user = response;
          this.editedUser = { ...this.user };
        } else {
          console.error('Logged-in user not found in the response.');
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
    
  }
  
  
  editDetails() {
    this.isEditMode = true;
  }

  updateDetails() {
    this.user = { ...this.editedUser };
    this.isEditMode = false;
  }

  cancelEdit() {
    this.editedUser = { ...this.user };
    this.isEditMode = false;
  }
}
