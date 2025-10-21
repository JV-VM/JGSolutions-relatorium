import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilList } from './soil-list';

describe('SoilList', () => {
  let component: SoilList;
  let fixture: ComponentFixture<SoilList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoilList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoilList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
