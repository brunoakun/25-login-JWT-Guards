import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public loading: boolean = false;

  miForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }



  ngOnInit(): void {
  }

  registro() {
    const nombre = this.miForm.value.nombre;
    const email = this.miForm.value.email;
    const password = this.miForm.value.password;
    this.loading = true;
    this.authService.registro(nombre, email, password)
      .subscribe(resp => {
        this.loading = false;
        if (resp.error === false) {
          Swal.fire('Ok', resp.mensaje, 'info');
          this.router.navigate(['/login']);
        } else {
          // Swal.fire('Error', msgToStr(resp.mensaje), 'error');
          for (let msg in resp.mensaje) {
            alert(resp.mensaje[msg]);
          }
        }
      });

    function msgToStr(obj: any) {
      return Object.values(obj).join('<br>');
    }

  }



}
