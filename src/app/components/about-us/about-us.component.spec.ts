import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutUsComponent } from './about-us.component';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { AppMenuComponent } from '../app-menu/app-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;
  let authService: AuthService;

  beforeEach(() => {
    // Create a mock AuthService
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    authServiceSpy.getCurrentUser.and.returnValue(of({ firstName: 'John', lastName: 'Doe' }));

    TestBed.configureTestingModule({
      declarations: [AboutUsComponent, AppMenuComponent],
      imports: [MatToolbarModule, MatIconModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    });

    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user information in the template', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const userName = element.querySelector('h6').textContent.trim();
    const userDescription = element.querySelector('p').textContent.trim();

    expect(userName).toBe('About');
    expect(userDescription).toContain('Lorem Ipsum is simply dummy text');
  });

  it('should call AuthService.getCurrentUser during initialization', () => {
    fixture.detectChanges();
    expect(authService.getCurrentUser).toHaveBeenCalledTimes(1);
  });
});
