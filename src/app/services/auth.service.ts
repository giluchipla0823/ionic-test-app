import { Injectable } from '@angular/core';
import { of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(email: string, password: string) {
    return of({}).pipe(
      switchMap(() => {
        if (email === 'admin@admin.com' && password === 'secret') {
          return of({
            email,
          });
        }

        return throwError(() => 'Credenciales de acceso incorrectas');
      })
    );
  }
}
