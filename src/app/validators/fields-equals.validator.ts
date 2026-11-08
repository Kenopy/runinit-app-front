import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fieldsEqualsValidator(campo: string, fieldConfirm: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const value = group.get(campo)?.value;
    const confirm = group.get(fieldConfirm)?.value;

    return value === confirm ? null : { [`${fieldConfirm}Diferente`]: true };
  };
}