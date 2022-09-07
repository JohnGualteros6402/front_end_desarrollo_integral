import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterThemeComponent } from './register-theme.component';

describe('RegisterThemeComponent', () => {
  let component: RegisterThemeComponent;
  let fixture: ComponentFixture<RegisterThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
