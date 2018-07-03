import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Call } from '../model/call';
import { Chat } from '../model/chat';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'tcc-list-of-act',
  templateUrl: './list-of-act.component.html',
  styleUrls: ['./list-of-act.component.css']
})
export class ListOfActComponent implements OnInit {
  calls: Call[];
  chats: Chat[];
  type : string;
  name : string;
  fromListOfAct : boolean = true;
  activitiesExist: boolean = false;;


  constructor( private dataService: DataService, private _router: Router) { }

  ngOnInit() {   
    debugger;
    this.calls = this.dataService.getCalls();
    this.chats = this.dataService.getChats();  
    if(this.calls.length != 0 || this.chats.length != 0 )
    {
      this.activitiesExist = true;
    }  
  }

  selection(event)  {
      debugger;
      var el = this.findAncestor(event.target);
      this.type = el.getElementsByTagName("mat-icon")[0].innerText;
      this.name = el.getElementsByClassName("name")[0].innerText;     
      if(this.type == 'call')
      this._router.navigate(['/call',this.name,this.fromListOfAct]);
      else
        this._router.navigate(['/chat',this.name,this.fromListOfAct]);

  }

   public findAncestor (el) {
    if(el.classList.contains('mat-list-item') )
      return el;
    while (!el.parentElement.classList.contains('mat-list-item'))
    {
        el = el.parentElement
    }
    return el.parentElement;
}  
}
