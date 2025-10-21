import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PestList } from './pest-list';

describe('PestList', () => {
  let component: PestList;
  let fixture: ComponentFixture<PestList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PestList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PestList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
