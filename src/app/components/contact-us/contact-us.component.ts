import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  
  currentUser: any;

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }
}
