import { BreakpointObserver , Breakpoints} from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent {
  isDesktop: boolean = true;

  constructor(private authService: AuthService, private router: Router, private breakpointObserver: BreakpointObserver){
  }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isDesktop = !result.matches;
    });
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
