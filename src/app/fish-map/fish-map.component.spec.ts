import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishMapComponent } from './fish-map.component';

describe('FishMapComponent', () => {
  let component: FishMapComponent;
  let fixture: ComponentFixture<FishMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
