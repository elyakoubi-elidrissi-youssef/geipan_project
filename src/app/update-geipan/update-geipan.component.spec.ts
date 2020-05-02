import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGeipanComponent } from './update-geipan.component';

describe('UpdateGeipanComponent', () => {
  let component: UpdateGeipanComponent;
  let fixture: ComponentFixture<UpdateGeipanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateGeipanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGeipanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
