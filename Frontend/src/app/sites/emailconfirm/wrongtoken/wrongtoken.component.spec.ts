import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongtokenComponent } from './wrongtoken.component';

describe('WrongtokenComponent', () => {
  let component: WrongtokenComponent;
  let fixture: ComponentFixture<WrongtokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongtokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongtokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
