import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTableDatasourceComponent } from './app-table-datasource.component';

describe('AppTableDatasourceComponent', () => {
  let component: AppTableDatasourceComponent;
  let fixture: ComponentFixture<AppTableDatasourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTableDatasourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTableDatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
