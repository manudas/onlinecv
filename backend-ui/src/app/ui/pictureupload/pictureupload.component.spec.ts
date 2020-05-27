import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureuploadComponent } from './pictureupload.component';

describe('PictureuploadComponent', () => {
  let component: PictureuploadComponent;
  let fixture: ComponentFixture<PictureuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
