import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMenuComponent } from './app-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
describe('AppMenuComponent', () => {
  let component: AppMenuComponent;
  let fixture: ComponentFixture<AppMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppMenuComponent ],
      imports: [HttpClientTestingModule, MatToolbarModule, MatIconModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
