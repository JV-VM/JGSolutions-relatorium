import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilForm } from './soil-form';

describe('SoilForm', () => {
  let component: SoilForm;
  let fixture: ComponentFixture<SoilForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoilForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoilForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
