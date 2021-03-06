import { Component, OnInit, ViewChildren, ViewChild,
  AfterContentInit, AfterViewInit, QueryList, ElementRef, ContentChild,  NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MatList, MatListItem, MatToolbar } from '@angular/material';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { Action } from '../model/action';
import { Event } from '../model/event';
import { Message } from '../model/message';
import { User } from '../model/user';
import { DataService } from '../services/data.service'
import {Call} from '../model/call'

const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Component({
  selector: 'tcc-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  action = Action;
  users: User[] = [];
  call: Call;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any; 
  navigationSubscription: any;
  // dialogRef: MatDialogRef<DialogUserComponent> | null;
  defaultDialogUserParams: any = {
    disableClose: true,
    data: {
      title: 'Welcome',
   //   dialogType: DialogUserType.NEW
    }
  };

  // getting a reference to the overall list, which is the parent container of the list items
  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  // getting a reference to the items/messages within the list
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;
  
 
 /* constructor(private socketService: SocketService,
    public dialog: MatDialog) { }
*/
constructor(private dataService : DataService, private route:ActivatedRoute, private router: Router, private _ngZone: NgZone
) { 
  window['UserComponent'] = {component: this, zone: _ngZone};
 /*  this.route.params.subscribe(val => {
    debugger;
    // put the code from `ngOnInit` here
  }); */
  this.navigationSubscription = this.router.events.subscribe((e: any) => {    
    // If it is a NavigationEnd event re-initalise the component
    if (e instanceof NavigationEnd) {
      this.initialiseInvites();
    }
  });

}

navigationReceiveCall(name: string, type: string)
{
  debugger;
 var user = {
    name: name,
  }
  this.call = {
    user : user
  }
  this.call.type =type;
  this.dataService.setCall(this.call)
  this.router.navigate(["/answerCall"]);

}

navigationEndCall(name: string, type: string)
{
  debugger;
  this.dataService.clearCallData(name);
  this.router.navigate(["/users"]);

}

initialiseInvites() {
  // Set default values and re-fetch any data you need.
  this.getUsers();
}

ngOnDestroy() {
  // avoid memory leaks here by cleaning up after ourselves. If we  
  // don't then we will continue to run our initialiseInvites()   
  // method on every navigationEnd event.
  if (this.navigationSubscription) {  
     this.navigationSubscription.unsubscribe();
  }
}
 
  ngOnInit(): void {
    debugger;
    this.getUsers();
    
    // Using timeout due to https://github.com/angular/angular/issues/14748
   /* setTimeout(() => {
      this.openUserPopup(this.defaultDialogUserParams);
    }, 0);*/
  }  
  getUsers(){   
    this.dataService.getUsers(); 
      this.users = this.dataService.getFormData().users;
  }
  
  ngAfterViewInit(): void {    
    // subscribing to any changes in the list of items / messages
   /*  this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom(); 
    });*/
  }

  // auto-scroll fix: inspired by this stack overflow post
  // https://stackoverflow.com/questions/35232731/angular2-scroll-to-bottom-chat-style
  /*private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }*/

  /* private initModel(): void {
    const randomId = this.getRandomId();
    this.users.push({
      id: randomId,
      avatar: `${AVATAR_URL}/${randomId}.png`,
      name: 'sarthak'
      
    },
    {
      id: randomId,
      avatar: `${AVATAR_URL}/${randomId}.png`,
      name: 'ayush'
    }
    );
  } */

  /*private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });


    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }*/

  /* private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  } */

  public selection(){
    debugger;
    /* var el = this.findAncestor(event.target);
      el.style.background = "green";*/


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
/*public navigate(){
    this._router.navigate(['/chat']);

}*/

  public onClickUserInfo() {
    /*this.openUserPopup({
      data: {
        username: this.user.name,
        title: 'Edit Details',
        dialogType: DialogUserType.EDIT
      }
    });*/
  }

  /*private openUserPopup(params): void {
    this.dialogRef = this.dialog.open(DialogUserComponent, params);
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }

      this.user.name = paramsDialog.username;
      if (paramsDialog.dialogType === DialogUserType.NEW) {
        this.initIoConnection();
        this.sendNotification(paramsDialog, Action.JOINED);
      } else if (paramsDialog.dialogType === DialogUserType.EDIT) {
        this.sendNotification(paramsDialog, Action.RENAME);
      }
    });
  }*/

 /* public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      }
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }*/
}

