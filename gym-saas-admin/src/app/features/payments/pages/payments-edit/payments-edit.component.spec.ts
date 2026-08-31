import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsEditComponent } from './payments-edit.component';

describe('PaymentsEditComponent', () => {
  let component: PaymentsEditComponent;
  let fixture: ComponentFixture<PaymentsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
