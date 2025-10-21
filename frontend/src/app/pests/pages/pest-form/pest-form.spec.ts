import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PestForm } from './pest-form';

describe('PestForm', () => {
  let component: PestForm;
  let fixture: ComponentFixture<PestForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PestForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PestForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
