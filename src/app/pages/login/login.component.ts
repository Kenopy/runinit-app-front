import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  erro = signal('');

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    senha: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.erro.set('');
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => {
        console.error('Erro de autenticação', err);
        this.erro.set('Credenciais inválidas!');
      }
    });
  }

    entrarComGoogle() {
    this.emBreve('Google');
  }

  entrarComApple() {
    this.emBreve('Apple');
  }

  entrarComFacebook() {
    this.emBreve('Facebook');
  }

  // Substituir por um metodo funcional quando construir o back
  private emBreve(provedor: string) {
    this.erro.set(`Login com ${provedor} ainda não está disponível.`);
  }
}