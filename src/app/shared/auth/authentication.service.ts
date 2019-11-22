import {Injectable} from '@angular/core';
import {UtilisateursModel} from '../../models/utilisateurs.model';
import {Repository} from 'typeorm';

@Injectable()
export class AuthenticationService {

  USER_ITEM = 'ls_user';
  userRepository = new Repository<UtilisateursModel>();

  constructor() {
  }

  login(user: UtilisateursModel): Promise<UtilisateursModel> {
    return this.userRepository.findOneOrFail(user);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.USER_ITEM) !== null && localStorage.getItem(this.USER_ITEM).length !== 0;
  }
}
