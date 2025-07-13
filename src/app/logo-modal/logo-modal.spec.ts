import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoModal } from './logo-modal';

describe('LogoModal', () => {
  let component: LogoModal;
  let fixture: ComponentFixture<LogoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
