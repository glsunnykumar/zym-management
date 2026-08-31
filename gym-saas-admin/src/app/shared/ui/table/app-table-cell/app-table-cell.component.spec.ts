import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTableCellComponent } from './app-table-cell.component';

describe('AppTableCellComponent', () => {
  let component: AppTableCellComponent;
  let fixture: ComponentFixture<AppTableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTableCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
