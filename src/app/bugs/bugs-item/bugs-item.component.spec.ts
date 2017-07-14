import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsItemComponent } from './bugs-item.component';

describe('BugsItemComponent', () => {
  let component: BugsItemComponent;
  let fixture: ComponentFixture<BugsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
