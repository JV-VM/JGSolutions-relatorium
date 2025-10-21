import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizationList } from './fertilization-list';

describe('FertilizationList', () => {
  let component: FertilizationList;
  let fixture: ComponentFixture<FertilizationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FertilizationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FertilizationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
