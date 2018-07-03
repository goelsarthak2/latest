import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { SharedModule } from './shared/shared.module';
import { UsersComponent } from './chat/shared/users/users.component';
import { CallComponent } from './chat/shared/call/call.component';
import { ListOfActComponent } from './chat/shared/list-of-act/list-of-act.component';
import { LoginComponent } from './chat/shared/login/login.component'; 

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CallComponent,
    ListOfActComponent ,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChatModule,
    SharedModule ,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
