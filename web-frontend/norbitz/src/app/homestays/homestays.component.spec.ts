import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomestaysComponent } from './homestays.component';

describe('HomestaysComponentComponent', () => {
  let component: HomestaysComponent;
  let fixture: ComponentFixture<HomestaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomestaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomestaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
