import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { FormFieldConfig } from '../../models';

@Component({
  selector: 'app-app-form-field',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './app-form-field.component.html',
  styleUrl: './app-form-field.component.scss'
})
export class AppFormFieldComponent {

   @Input({ required: true })
  control!: FormControl;

  @Input({ required: true })
  config!: FormFieldConfig;


  getError(): string {

  if (this.control.hasError('required'))
    return `${this.config.label} is required`;

  if (this.control.hasError('email'))
    return 'Please enter a valid email';

  if (this.control.hasError('minlength'))
    return 'Too short';

  if (this.control.hasError('maxlength'))
    return 'Maximum length exceeded';

  if (this.control.hasError('pattern'))
    return 'Invalid format';

  return 'Invalid value';

}
}
