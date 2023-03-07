import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
  });

  it('should do login and return the entered email', () => {
    const email = 'admin@admin.com';
    const password = 'secret';

    authService.login(email, password).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.email).toBe(email);
    });
  });

  it('should not login when email and password are invalid', () => {
    const email = 'other@other.com';
    const password = 'other_password';

    authService.login(email, password).subscribe(
      () => fail('No login because email and password are invalid'),
      (err: string) => {
        expect(err).toBe('Credenciales de acceso incorrectas');
      }
    );
  });
});
