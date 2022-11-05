import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivetodosComponent } from './activetodos.component';

describe('ActivetodosComponent', () => {
  let component: ActivetodosComponent;
  let fixture: ComponentFixture<ActivetodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivetodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivetodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
