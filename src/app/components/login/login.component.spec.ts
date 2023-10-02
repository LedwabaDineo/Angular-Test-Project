import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatToolbarModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm with empty username and password', () => {
    expect(component.loginForm.get('username')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should call login method when form is submitted with valid data', () => {
    const username = 'testUser';
    const password = 'testPassword';
    authServiceSpy.login.and.returnValue(of(true));

    component.username.setValue(username);
    component.password.setValue(password);
    component.loginForm.updateValueAndValidity();
    component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith(username, password);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should set error message when login fails', () => {
    authServiceSpy.login.and.returnValue(of(false));

    component.loginForm.markAllAsTouched();
    component.login();

    expect(component.error).toBe('Please fill in all required fields.');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
});


  it('should set error message when loginForm is invalid', () => {
    component.login();

    expect(component.error).toBe('Please fill in all required fields.');
    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should get current user', () => {
    const username = 'testUser';
    component['currentUser'] = { username };

    const result = component.getCurrentUser();

    expect(result).toEqual({ username });
  });
});
