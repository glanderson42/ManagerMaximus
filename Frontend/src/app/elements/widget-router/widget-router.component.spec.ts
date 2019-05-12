import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetRouterComponent } from './widget-router.component';

describe('WidgetRouterComponent', () => {
  let component: WidgetRouterComponent;
  let fixture: ComponentFixture<WidgetRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetRouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
