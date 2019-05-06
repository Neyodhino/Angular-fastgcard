import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResponseComponent } from './admin-response.component';

describe('AdminResponseComponent', () => {
  let component: AdminResponseComponent;
  let fixture: ComponentFixture<AdminResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
