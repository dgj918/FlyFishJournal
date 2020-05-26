import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFishDialogComponent } from './add-fish-dialog.component';

describe('AddFishDialogComponent', () => {
  let component: AddFishDialogComponent;
  let fixture: ComponentFixture<AddFishDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFishDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFishDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
