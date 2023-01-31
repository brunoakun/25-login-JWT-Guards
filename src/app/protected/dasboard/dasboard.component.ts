import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  get usuario() {
    return this.authService.usuario;
  }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }

}
