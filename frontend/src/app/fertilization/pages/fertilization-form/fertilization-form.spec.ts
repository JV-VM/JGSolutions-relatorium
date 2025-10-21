import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizationForm } from './fertilization-form';

describe('FertilizationForm', () => {
  let component: FertilizationForm;
  let fixture: ComponentFixture<FertilizationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FertilizationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FertilizationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
