import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
    expect(component.loginForm.get('rememberMe')?.value).toBe(false);
  });

  it('should invalidate form when email is empty', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBeTruthy();
  });

  it('should invalidate form when email format is invalid', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();
  });

  it('should validate form when email format is correct', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should invalidate form when password is empty', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.hasError('required')).toBeTruthy();
  });

  it('should invalidate form when password is less than 6 characters', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('12345');
    expect(passwordControl?.hasError('minlength')).toBeTruthy();
  });

  it('should validate form when password has 6 or more characters', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('123456');
    expect(passwordControl?.valid).toBeTruthy();
  });

  it('should validate entire form when all fields are valid', () => {
    component.loginForm.get('email')?.setValue('test@example.com');
    component.loginForm.get('password')?.setValue('password123');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should call onSubmit and log form data when form is valid', () => {
    spyOn(console, 'log');
    component.loginForm.get('email')?.setValue('test@example.com');
    component.loginForm.get('password')?.setValue('password123');
    
    component.onSubmit();
    
    expect(console.log).toHaveBeenCalledWith('Login data:', jasmine.objectContaining({
      email: 'test@example.com',
      password: 'password123',
      rememberMe: false
    }));
  });

  it('should mark all fields as touched when form is invalid on submit', () => {
    component.loginForm.get('email')?.setValue('');
    component.loginForm.get('password')?.setValue('');
    
    component.onSubmit();
    
    expect(component.loginForm.get('email')?.touched).toBeTruthy();
    expect(component.loginForm.get('password')?.touched).toBeTruthy();
  });

  it('should call onRegister and log navigation', () => {
    spyOn(console, 'log');
    component.onRegister();
    expect(console.log).toHaveBeenCalledWith('Navegando para cadastro');
  });

  it('should return true for emailInvalid when email is invalid and touched', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    emailControl?.markAsTouched();
    expect(component.emailInvalid).toBeTruthy();
  });

  it('should return false for emailInvalid when email is valid', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('test@example.com');
    emailControl?.markAsTouched();
    expect(component.emailInvalid).toBeFalsy();
  });

  it('should return true for passwordInvalid when password is invalid and touched', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('123');
    passwordControl?.markAsTouched();
    expect(component.passwordInvalid).toBeTruthy();
  });

  it('should return false for passwordInvalid when password is valid', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('password123');
    passwordControl?.markAsTouched();
    expect(component.passwordInvalid).toBeFalsy();
  });
});