import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusdisplayComponent } from './statusdisplay.component';

describe('StatusdisplayComponent', () => {
  let component: StatusdisplayComponent;
  let fixture: ComponentFixture<StatusdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
