import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let httpTestingController: HttpTestingController;

  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatCardModule,MatToolbarModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ RegistrationComponent ]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
