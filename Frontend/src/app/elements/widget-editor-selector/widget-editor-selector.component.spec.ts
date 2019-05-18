import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetEditorSelectorComponent } from './widget-editor-selector.component';

describe('WidgetEditorSelectorComponent', () => {
  let component: WidgetEditorSelectorComponent;
  let fixture: ComponentFixture<WidgetEditorSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetEditorSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetEditorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
