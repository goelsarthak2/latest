import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service'

declare var kandy: any;
declare var connectStatus: any;

@Component({
  selector: 'tcc-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  user : string
  pass : string
  constructor(private _router: Router, private dataService : DataService) { }

  ngOnInit() {  
    
  }
  async login() {
    debugger; 
      kandy.connect({
      username: this.user.trim()+"@trials.com",
      password: this.pass
    })   
  await this.delay(3000);
  if(connectStatus == true)     
  {
      this.dataService.setUser({
          name: this.user.trim()+"@trials.com"
      })
      debugger;
      this.dataService.sendData('Message from button Click on Child One');
      this._router.navigate(["/users"]);  
  }  

}

 delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}



}
