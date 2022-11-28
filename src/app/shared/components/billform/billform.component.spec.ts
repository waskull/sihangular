import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillformComponent } from './billform.component';

describe('BillformComponent', () => {
  let component: BillformComponent;
  let fixture: ComponentFixture<BillformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
