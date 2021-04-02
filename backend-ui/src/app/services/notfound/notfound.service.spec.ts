import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfoundService } from './notfound.service';

describe('NotfoundComponent', () => {
  let component: NotfoundService;
  let fixture: ComponentFixture<NotfoundService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotfoundService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotfoundService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
