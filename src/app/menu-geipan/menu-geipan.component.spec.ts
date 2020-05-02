import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGeipanComponent } from './menu-geipan.component';

describe('MenuGeipanComponent', () => {
  let component: MenuGeipanComponent;
  let fixture: ComponentFixture<MenuGeipanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuGeipanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGeipanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
