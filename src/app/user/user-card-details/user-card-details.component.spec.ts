import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardDetailsComponent } from './user-card-details.component';

describe('UserCardDetailsComponent', () => {
  let component: UserCardDetailsComponent;
  let fixture: ComponentFixture<UserCardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
