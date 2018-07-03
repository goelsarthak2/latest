import {Call} from './call';
import { Chat } from './chat'
import { User } from './user'

export class FormData {
    chats:  Chat[]= [];
    calls: Call[]= [];
    chat: Chat = new Chat();
    call: Call = new Call();
    users: User[] =[];
    loggedIn: boolean = false;
    
} 
