import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerCreateComponent } from './trainer-create.component';

describe('TrainerCreateComponent', () => {
  let component: TrainerCreateComponent;
  let fixture: ComponentFixture<TrainerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
