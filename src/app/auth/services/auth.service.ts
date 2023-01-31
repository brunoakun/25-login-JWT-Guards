import { AuthResponse, Usuario } from './../interfaces/auth';
import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, map, of, catchError, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  public usuario: Usuario = {};

  constructor(private http: HttpClient) { }


  logIn(email: string, password: string) {
    this.logOut();
    const url = `${this.apiUrl}/login`;
    const body = { email, password };
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          // tap(), permite hacer cosas con los datos antes de devolver el observable
          if (!resp.error) {
            localStorage.setItem('token', resp.data.token!);
          }
        })
      )
  }

  logOut() {
    this.usuario = {};
    localStorage.clear();
  }


  validarToken(): Observable<boolean> {
    // Si puedo acceder al perfíl del usuario, el token es válido, devolver un bool si/no 
    const url = `${this.apiUrl}/profile`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
      })
    };
    return this.http.get<AuthResponse>(url, httpOptions)
      .pipe(
        map(resp => {
          // map(), permite modificar el resultado antes de devolverlo
          const valid = !resp.error;
          this.usuario = {};
          if (valid) {
            this.usuario = {
              id: resp.data.profile.id,
              role: resp.data.profile.role,
              email: resp.data.profile.email
            }
          }
          return (valid) // true si no hay error, false si hay error
        })
      );
  }

}



