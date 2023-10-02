import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalDetailsComponent } from './personal-details.component';
import { PersonalDetailsService } from 'src/app/services/personal-details.service';
import { AppMenuComponent } from '../app-menu/app-menu.component';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

describe('PersonalDetailsComponent', () => {
  let component: PersonalDetailsComponent;
  let fixture: ComponentFixture<PersonalDetailsComponent>;
  let personalDetailsServiceSpy: jasmine.SpyObj<PersonalDetailsService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  // Mock user data
  const mockUser = {
    username: 'user1',
    firstName: 'Dineo',
    lastName: 'Doe',
    dateOfBirth: '01/01/1990',
    identityNumber: '123456789',
    mobileNumber: '06739284212',
    gender: 'Male',
    maritalStatus: 'Single',
    address: {
      line1: '124 Main St',
      line2: '',
      line3: '',
      suburb: 'centurion',
      city: 'pretoria',
      postalCode: '12345',
      country: 'south africa',
    },
  };

  // Mock edited user data
  const mockEditedUser = {
    username: 'user1',
    firstName: 'Edited Dineo',
    lastName: 'Edited Doe',
    dateOfBirth: '02/02/1990',
    identityNumber: '987654321',
    mobileNumber: '0712345678',
    gender: 'Female',
    maritalStatus: 'Married',
    address: {
      line1: '456 Updated St',
      line2: 'Apt 123',
      line3: 'Floor 5',
      suburb: 'New Suburb',
      city: 'New City',
      postalCode: '54321',
      country: 'New Country',
    },
  };
  let service: PersonalDetailsService;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    personalDetailsServiceSpy = jasmine.createSpyObj('PersonalDetailsService', ['getUsers']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);

    await TestBed.configureTestingModule({
      declarations: [PersonalDetailsComponent, AppMenuComponent],
      imports: [HttpClientTestingModule, HttpClientModule, MatCardModule, MatToolbarModule, MatFormFieldModule, MatInputModule, FormsModule, BrowserAnimationsModule, MatIconModule],

      providers: [
        { provide: PersonalDetailsService, useValue: personalDetailsServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();
    service = TestBed.inject(PersonalDetailsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PersonalDetailsComponent);

    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure there are no outstanding HTTP requests
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user and editedUser properties', () => {
    authServiceSpy.getCurrentUser.and.returnValue({ username: 'user1' });
    personalDetailsServiceSpy.getUsers.and.returnValue(of([mockUser]));

    fixture.detectChanges();

    expect(component.user).toEqual(mockUser);
    expect(component.editedUser).toEqual(mockUser);
  });

  it('should set isEditMode to true when editDetails() is called', () => {
    component.isEditMode = false;
    component.editDetails();
    expect(component.isEditMode).toBe(true);
  });

  it('should update user and set isEditMode to false when updateDetails() is called', () => {
    component.editedUser = mockEditedUser;
    component.isEditMode = true;

    component.updateDetails();

    expect(component.user).toEqual(mockEditedUser);
    expect(component.isEditMode).toBe(false);
  });

  it('should reset editedUser and set isEditMode to false when cancelEdit() is called', () => {
    component.user = mockEditedUser;
    component.editedUser = mockEditedUser;
    component.isEditMode = true;

    component.cancelEdit();

    expect(component.editedUser).toEqual(component.user);
    expect(component.isEditMode).toBe(false);
  });
});
