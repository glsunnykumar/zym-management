import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSelectFieldComponent } from './app-select-field.component';

describe('AppSelectFieldComponent', () => {
  let component: AppSelectFieldComponent;
  let fixture: ComponentFixture<AppSelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSelectFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
