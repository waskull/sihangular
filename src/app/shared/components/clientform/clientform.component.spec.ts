import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientformComponent } from './clientform.component';

describe('ClientformComponent', () => {
  let component: ClientformComponent;
  let fixture: ComponentFixture<ClientformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
