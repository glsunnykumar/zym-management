import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPlanCardComponent } from './member-plan-card.component';

describe('MemberPlanCardComponent', () => {
  let component: MemberPlanCardComponent;
  let fixture: ComponentFixture<MemberPlanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberPlanCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberPlanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
