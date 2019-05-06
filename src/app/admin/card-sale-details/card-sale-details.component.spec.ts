import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSaleDetailsComponent } from './card-sale-details.component';

describe('CardSaleDetailsComponent', () => {
  let component: CardSaleDetailsComponent;
  let fixture: ComponentFixture<CardSaleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSaleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSaleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
