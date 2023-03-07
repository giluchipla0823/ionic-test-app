import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import {
  IonicModule,
  LoadingController,
  LoadingOptions,
  IonInput,
  IonButton,
} from '@ionic/angular';

import { LoginPage } from './login.page';
import { SharedComponentsModule } from 'src/app/components/shared/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

class LoadingControllerMock {
  opts!: LoadingOptions;

  create(opts: LoadingOptions): Promise<HTMLIonLoadingElement> {
    this.opts = opts;

    return Promise.resolve(<HTMLIonLoadingElement>{
      present: (): Promise<void> => {
        return Promise.resolve();
      },
      dismiss: () => {
        return Promise.resolve(true);
      },
    });
  }
}

const ROUTER_MOCK = {
  navigate: jasmine.createSpy('navigate'),
};

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authServiceSpy: any;

  beforeEach(waitForAsync(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        CommonModule,
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        SharedComponentsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        { provide: LoadingController, useClass: LoadingControllerMock },
        {
          provide: Router,
          useValue: ROUTER_MOCK,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authServiceSpy.login.and.returnValue(of({}));
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with three fields (email, password and remember_me)', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
    expect(component.form.contains('remember_me')).toBeTruthy();
  });

  it('should the email and password be required', () => {
    const email = component.form.get('email');
    const password = component.form.get('password');

    email?.setValue('');
    password?.setValue('');

    expect(email?.valid).toBeFalsy();
    expect(password?.valid).toBeFalsy();
  });

  it('should the email have a valid format', () => {
    const control = component.form.get('email');

    control?.setValue('admin@admin.com');

    expect(control?.valid).toBeTruthy();
  });

  it('should the remember_me be optional and its default value is false', () => {
    const control = component.form.get('remember_me');

    expect(control?.value).toBe(false);
    expect(control?.valid).toBeTruthy();
  });

  it('should not allow user to log in when the form is not valid', () => {
    const data = {
      email: 'admin',
      password: '123456',
      remember_me: false,
    };

    component.form.setValue(data);
    component.onSubmit();

    expect(component.form.invalid).toBeTruthy();
    expect(authServiceSpy.login).toHaveBeenCalledTimes(0);
  });

  it('should allow user to log in when the form is valid', fakeAsync(() => {
    const data = {
      email: 'admin@admin.com',
      password: 'secret',
      remember_me: false,
    };

    component.form.setValue(data);
    component.onSubmit();

    expect(component.form.valid).toBeTruthy();

    tick();

    expect(authServiceSpy.login).toHaveBeenCalledTimes(1);

    expect(ROUTER_MOCK.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should the form must have two ion-input tags', () => {
    const tags = fixture.debugElement.queryAll(By.directive(IonInput));

    expect(tags).toBeTruthy();
    expect(tags.length).toBe(2);
  });

  it('should the form must have a ion-button tag and must be of submit type', () => {
    const button = fixture.debugElement.query(By.directive(IonButton));

    expect(button).toBeTruthy();
    expect(button.nativeElement.type).toBe('submit');
  });

  it('should have title form', () => {
    const tag = fixture.debugElement.nativeElement.querySelector('.card-title');

    expect(tag).toBeTruthy();
    expect(tag.textContent.trim()).toBe('Prueba técnica');
  });
});
