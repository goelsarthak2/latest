import { Component, OnInit,NgZone } from '@angular/core';
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
  constructor(private _router: Router, private dataService : DataService, private _ngZone: NgZone) {
    debugger;
    window['LoginComponent'] = {component: this, zone: _ngZone};
   }

   /* runThisFunctionFromOutside()
   {
 
     debugger; 
   } */

  ngOnInit() {      
  }

   login() {  
     debugger;  
      kandy.connect({
      username: this.user.trim()+"@trials.com",
      password: this.pass
    })   
  //await this.delay(3000);
 /*  if(connectStatus == true)     
  {
      this.dataService.setUser({
          name: this.user.trim()+"@trials.com"
      })
      debugger;
      this.dataService.sendData(true);
      this._router.navigate(["/users"]);  
  }  
  else
  {
  this.dataService.sendData(false);
  } */

}
loginFromOutside(connectStatus : boolean)
{
 debugger;
  if(connectStatus == true)     
  {
    this.dataService.setUser({
    name: this.user.trim()+"@trials.com"
    })      
    this.dataService.sendData(true);
    this._router.navigate(["/users"]);  
  }  
  else
  {
    this.dataService.sendData(false);
  }
}
/* 
 delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
} */



}
