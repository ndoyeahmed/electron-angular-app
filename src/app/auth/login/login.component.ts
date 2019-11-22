import { Component, OnInit } from '@angular/core';
import {UtilisateursModel} from '../../models/utilisateurs.model';
import {AuthenticationService} from '../../shared/auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  utilisateur = new UtilisateursModel();
  // userRepository = getRepository(UtilisateursModel);

  constructor(private auth: AuthenticationService, private route: Router) {
  }

  ngOnInit(): void {
  }

  save() {
    this.auth.login(this.utilisateur).then(data => {
      localStorage.setItem('ls_user', JSON.stringify(data));
      this.route.navigate(['/pages/users']);
    }).catch(err => {
      console.log(err);
      this.route.navigate(['/']);
    });
  }
}
