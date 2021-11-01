import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApolicesComponent } from './apolices.component';

describe('ApolicesComponent', () => {
  let component: ApolicesComponent;
  let fixture: ComponentFixture<ApolicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApolicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApolicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
