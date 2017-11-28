import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunComponent } from './fun.component';

describe('FunComponent', () => {
  let component: FunComponent;
  let fixture: ComponentFixture<FunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
