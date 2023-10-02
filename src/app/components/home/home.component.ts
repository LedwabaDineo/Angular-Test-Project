import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  isMobile = false;
  breadcrumbItems: string[] = ['Home', 'Page'];

  constructor(private authService: AuthService, private router: Router, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

}
