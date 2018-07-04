import { Injectable } from '@angular/core';
import { Call }  from '../model/call'
import {Chat}  from '../model/chat'
import {User}  from '../model/user'
import {FormData} from '../model/data'

declare var getUser: any;
declare var setUser: any;
declare var removeUser: any;

const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Injectable()
export class DataService {
    users: User[]= []
    user : User= {
        name : ""
    }
    private formData: FormData = new FormData();
    
    getCalls(): Call[] {            
        return this.formData.calls;
    }
 
    setCall(data: Call) {  
        var user : User =  { 
            name : data.user.name,
            avatar: data.user.avatar
        }    
       var call :Call ={
           user: user
       }
        this.formData.calls.push(call);
    }
 
    getChats() : Chat[] {         
        
        return this.formData.chats;         
    }
    
    setChat(data: Chat) {      
         var user : User =  { 
            name : data.user.name,
            avatar: data.user.avatar
        }    
       var chat :Chat ={
           user: user
       } 
        this.formData.chats.push(chat);
    }   
   
    getFormData(): FormData {       
        // Return the entire Form Data
        return this.formData;
    } 

    getCall(): Call {
       //this.formData.call.user = [];
        // Return the Personal data        
        return this.formData.call;
    }

    getChat(): Chat {
    //this.formData.chat.user = [];
        // Return the Personal data       
        return this.formData.chat;
    }
    setUser(user: User)  {
    debugger;
    this.user.name = user.name;     
    this.formData.loggedIn = true;
    const randomId = this.getRandomId();
    let name = getUser();   
    setUser(user.name);
    if(name != '')
    {
    name.forEach(element => {
        this.users.push({
            id: randomId,
            avatar: `${AVATAR_URL}/${randomId}.png`,
            name: element  }
          ) 
    });  
    }
    this.formData.users = this.users;   
  }
  

  resetFormData(){
      removeUser(this.user.name);
      this.formData =  new FormData();
      this.users = [];
  }
   private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }
  checkedStatus(): boolean{
    return this.formData.loggedIn == true
    
  }
}