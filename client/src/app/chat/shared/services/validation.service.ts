import { Injectable } from '@angular/core';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService} from '../services/data.service'

@Injectable()
export class AuthService {
  constructor(private dataService : DataService) {}
  // ...
  public isAuthenticated(): boolean {
    const status = this.dataService.checkedStatus();    
    // Check whether the token is expired and return
    // true or false
    //return !this.jwtHelper.isTokenExpired(token);
    return status;
  }
}