import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPaymentSummaryComponent } from './member-payment-summary.component';

describe('MemberPaymentSummaryComponent', () => {
  let component: MemberPaymentSummaryComponent;
  let fixture: ComponentFixture<MemberPaymentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberPaymentSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberPaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
