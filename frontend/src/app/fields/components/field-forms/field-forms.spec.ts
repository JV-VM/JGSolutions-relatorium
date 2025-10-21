import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldForms } from './field-forms';

describe('FieldForms', () => {
  let component: FieldForms;
  let fixture: ComponentFixture<FieldForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldForms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
