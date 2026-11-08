import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login';
import { RegisterRequest } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private readonly API_URL = 'http://localhost:8081/api/auth';

  login(credenciais: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credenciais).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  register(dados: RegisterRequest): Observable<unknown> {
    return this.http.post(`${this.API_URL}/registroUsuario`, dados);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}