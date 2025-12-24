import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormationsSessions } from './admin-formations-sessions';

describe('AdminFormationsSessions', () => {
  let component: AdminFormationsSessions;
  let fixture: ComponentFixture<AdminFormationsSessions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFormationsSessions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFormationsSessions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
