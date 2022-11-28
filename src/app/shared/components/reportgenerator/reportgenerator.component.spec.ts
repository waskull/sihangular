import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportgeneratorComponent } from './reportgenerator.component';

describe('ReportgeneratorComponent', () => {
  let component: ReportgeneratorComponent;
  let fixture: ComponentFixture<ReportgeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportgeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
