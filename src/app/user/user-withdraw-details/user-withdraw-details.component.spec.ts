import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWithdrawDetailsComponent } from './user-withdraw-details.component';

describe('UserWithdrawDetailsComponent', () => {
  let component: UserWithdrawDetailsComponent;
  let fixture: ComponentFixture<UserWithdrawDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWithdrawDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWithdrawDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
