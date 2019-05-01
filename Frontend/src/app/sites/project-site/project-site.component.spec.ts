import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSiteComponent } from './project-site.component';

describe('ProjectSiteComponent', () => {
  let component: ProjectSiteComponent;
  let fixture: ComponentFixture<ProjectSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
