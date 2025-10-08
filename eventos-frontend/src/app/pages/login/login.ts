import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  returnUrl = '/home';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    
    // Captura a URL de retorno se existir
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    
    // Se já estiver autenticado, redireciona
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login realizado com sucesso!');
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erro ao fazer login:', error);
          
          if (error.status === 401) {
            this.errorMessage = 'Email ou senha inválidos';
          } else if (error.status === 0) {
            this.errorMessage = 'Não foi possível conectar ao servidor';
          } else {
            this.errorMessage = 'Erro ao fazer login. Tente novamente.';
          }
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  onRegister(): void {
    this.router.navigate(['/cadastro']);
  }

  get emailInvalid(): boolean {
    const email = this.loginForm.get('email');
    return !!(email && email.invalid && email.touched);
  }

  get passwordInvalid(): boolean {
    const password = this.loginForm.get('password');
    return !!(password && password.invalid && password.touched);
  }
}