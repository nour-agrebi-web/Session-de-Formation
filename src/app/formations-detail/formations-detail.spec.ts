import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsDetail } from './formations-detail';

describe('FormationsDetail', () => {
  let component: FormationsDetail;
  let fixture: ComponentFixture<FormationsDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationsDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationsDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
