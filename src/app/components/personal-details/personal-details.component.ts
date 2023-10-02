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
    const loggedInUser = this.authService.getCurrentUser();

    // Fetch user data from the service and filter the logged-in user
    this.userService.getUsers().subscribe((users: any[]) => {
      this.user = users.find((user) => user.username === loggedInUser?.username) || ({} as PersonalDetails);
      this.editedUser = { ...this.user };
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