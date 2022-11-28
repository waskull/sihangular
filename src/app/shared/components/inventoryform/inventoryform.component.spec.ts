import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryformComponent } from './inventoryform.component';

describe('InventoryformComponent', () => {
  let component: InventoryformComponent;
  let fixture: ComponentFixture<InventoryformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
