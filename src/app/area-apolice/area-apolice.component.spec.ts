import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaApoliceComponent } from './area-apolice.component';

describe('AreaApoliceComponent', () => {
  let component: AreaApoliceComponent;
  let fixture: ComponentFixture<AreaApoliceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaApoliceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaApoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
