import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Call } from '../model/call';
import { User } from '../model/user';

declare var makeCall : any 
declare var answerCall : any 
declare var rejectCall : any 
declare var endCall : any 

@Component({
  selector: 'tcc-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {
  name: string ;
  type: boolean;
  call: Call;
  fromListOfAct : string ;
  answerCallExist : boolean = false;
   user: User= {
    name : ''
  }
  
  constructor(   private _activatedRoute: ActivatedRoute, private _router: Router, 
  private dataService: DataService, private _ngZone: NgZone
  ) { 
    //window['anComponent'] = {component: this, zone: _ngZone};
  }

 
  ngOnInit() {   
    debugger;
     this.call = this.dataService.getCall();
     this.name = this._activatedRoute.snapshot.params['name'];
     
     this.fromListOfAct = this._activatedRoute.snapshot.params['fromListOfAct'];
      if(this.name == undefined && this._activatedRoute.snapshot.url[0].path != "answerCall")
     {
       this._router.navigate(['/users']);
     }
     if(this.dataService.getCalls().length != 0 && this._activatedRoute.snapshot.url[0].path == "answerCall")
     {
        this.name = this.dataService.getCalls()[this.dataService.getCalls().length- 1].user.name;
     }
      if (this._activatedRoute.snapshot.url[0].path == "answerCall" && this.name != undefined)
     {     
        this.type= false;
        this.answerCallExist = true;       
     }
     else if (this._activatedRoute.snapshot.url[0].path == "call")
     {
          this.type= true;
          this.user.name = this.name;
          this.user.avatar = this.dataService.users.find(x=>x.name == this.name).avatar;
          this.call.user = this.user;    
         // this.dataService.setCall(this.call);
          if( this.fromListOfAct != "true" )
          {
              this.dataService.setCall(this.call); 
          }   
          makeCall(this.name);
     }    
    
   
  }
   showScreen(): boolean{    
      return this.answerCallExist==true || this.type==true;

     }
  rejectCall(){
    debugger;
    rejectCall();
  }
  acceptCall(){
    this.type= true;
    answerCall();
  }
  endCall(){
    this.type= true;
    endCall();
  }

}
