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
    httpTestingController.verify(); 
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  

  it('should set isEditMode to true when editDetails() is called', () => {
    component.isEditMode = false;
    component.editDetails();
    expect(component.isEditMode).toBe(true);
  });


  it('should reset editedUser and set isEditMode to false when cancelEdit() is called', () => {
 
    component.isEditMode = true;

    component.cancelEdit();

    expect(component.editedUser).toEqual(component.user);
    expect(component.isEditMode).toBe(false);
  });
});
