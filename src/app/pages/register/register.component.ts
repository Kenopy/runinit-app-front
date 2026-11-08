import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { fieldsEqualsValidator } from '../../validators/fields-equals.validator';
import { minimalYearValidator } from '../../validators/minimal-year.validator';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  erro = signal('');
  enviando = signal(false);

  hoje = new Date().toLocaleDateString('en-CA');

  registerForm = new FormGroup(
    {
      nome: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      confirmEmail: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      dataNascimento: new FormControl('', { nonNullable: true, validators: [Validators.required, minimalYearValidator(18)] }),
      senha: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
      confirmSenha: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    },
    {
      validators: [
        fieldsEqualsValidator('email', 'confirmEmail'),
        fieldsEqualsValidator('senha', 'confirmSenha')
      ]
    }
  );

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.erro.set('');
    this.enviando.set(true);

    // Remove as confirmações: sobram exatamente nome, email, senha e dataNascimento (o RegisterRequest do back)
    const { confirmEmail, confirmSenha, ...dados } = this.registerForm.getRawValue();

    this.authService.register(dados).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: HttpErrorResponse) => {
        console.error('Erro no cadastro', err);
        this.erro.set(err.status === 409 ? 'Este e-mail já está cadastrado.' : 'Não foi possível concluir o cadastro.');
        this.enviando.set(false);
      }
    });
  }
}