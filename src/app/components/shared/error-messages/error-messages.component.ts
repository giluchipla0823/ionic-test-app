import { Component, Input, AfterViewInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const ERROR_MESSAGES: Record<string, string> = {
  required: 'Campo requerido',
  email: 'El campo no es un email válido',
  pattern: 'El campo no tiene un formato válido',
};

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
})
export class ErrorMessagesComponent implements AfterViewInit {
  @Input() control!: AbstractControl;
  @Input() customErrors: Record<string, string> = {};

  constructor() {}

  ngAfterViewInit(): void {
    Object.keys(this.customErrors).forEach((errorType) => {
      ERROR_MESSAGES[errorType] = this.customErrors[errorType];
    });
  }

  get errorMessage() {
    for (const error in this.control?.errors) {
      if (
        this.control.errors.hasOwnProperty(error) &&
        (this.control.touched ||
          (this.control.asyncValidator !== null && !this.control.pristine))
      ) {
        return ERROR_MESSAGES[error];
      }
    }
    return null;
  }
}
