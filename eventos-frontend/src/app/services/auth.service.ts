import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}

export interface CadastroRequest {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  dataNascimento: string;
  tipoParticipante?: {
    id: number;
    nome: string;
  };
  endereco: {
    id?: number;
    CEP?: string; // aceita CEP com hífen conforme payload desejado
    cep?: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    estado: string;
  };
  nro_casa: string;
}

export interface ParticipanteInfo {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  tipoParticipante: {
    id: number;
    nome: string;
  };
  endereco: {
    id: number;
    CEP: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    estado: string;
  };
  nro_casa: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8089';
  private readonly TOKEN_KEY = 'auth_token';
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  public token$ = this.tokenSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  cadastrar(dados: CadastroRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/registro`, dados)
      .pipe(
        tap(response => {
          if (response.token) {
            this.saveToken(response.token);
          }
        })
      );
  }

  login(email: string, senha: string): Observable<LoginResponse> {
    const loginData: LoginRequest = { email, senha };
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, loginData)
      .pipe(
        tap(response => {
          if (response.token) {
            this.saveToken(response.token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  getParticipanteInfo(): Observable<ParticipanteInfo> {
    return this.http.get<ParticipanteInfo>(`${this.API_URL}/participantes/me`, {
      headers: this.getAuthHeaders()
    });
  }

  updateParticipante(dados: Partial<ParticipanteInfo>): Observable<ParticipanteInfo> {
    return this.http.put<ParticipanteInfo>(`${this.API_URL}/participantes/me`, dados, {
      headers: this.getAuthHeaders()
    });
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  validateToken(): Observable<boolean> {
    const token = this.getToken();
    if (!token) {
      return of(false);
    }

    return this.http.get<ParticipanteInfo>(`${this.API_URL}/participantes/me`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(() => true),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}