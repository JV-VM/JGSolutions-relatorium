import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancesForm } from './finances-form';

describe('FinancesForm', () => {
  let component: FinancesForm;
  let fixture: ComponentFixture<FinancesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancesForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
