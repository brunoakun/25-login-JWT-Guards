import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  miForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authSrv: AuthService
  ) { }

  ngOnInit(): void {
  }

  logIn() {
    const email = this.miForm.value.email;
    const password = this.miForm.value.password;
    this._authSrv.logIn(email, password).subscribe(resp => {
      if (resp.error === false) {
        this.router.navigate(['/panel']);
      } else {
        Swal.fire('Error', resp.message, 'error');
      }
    })
  }

}


