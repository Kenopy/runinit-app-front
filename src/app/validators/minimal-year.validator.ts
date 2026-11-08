import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minimalYearValidator(minimalYear: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor: string = control.value;

    if (!valor) return null;

    const [ano, mes, dia] = valor.split('-').map(Number);
    const nascimento = new Date(ano, mes - 1, dia);
    const hoje = new Date();

    if (nascimento > hoje) return { dataFutura: true };

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const jaFezAniversario =
      hoje.getMonth() > nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() >= nascimento.getDate());
    if (!jaFezAniversario) idade--;

    return idade >= minimalYear ? null : { idadeMinima: { minimo: minimalYear } };
  };
}