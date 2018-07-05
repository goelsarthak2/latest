import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, RouteReuseStrategy } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './chat/shared/users/users.component';
import { CallComponent } from './chat/shared/call/call.component';
import { ListOfActComponent } from './chat/shared/list-of-act/list-of-act.component';
import { LoginComponent } from './chat/shared/login/login.component';
import { 
  AuthGuardService as AuthGuard 
} from './chat/shared/services/validation-auth.service';
import { AuthService } from './chat/shared/services/validation.service';

import {CustomRouteReuseStrategy } from './chat/shared/services/route-reuse.strategy'
const routes: Routes = [  
   { path: 'users', component: UsersComponent,  canActivate: [AuthGuard],runGuardsAndResolvers: 
  'always'   },   
   { path: 'call', component: CallComponent,  canActivate: [AuthGuard] },
   { path: 'chat', component: ChatComponent,  canActivate: [AuthGuard] },
  { path: 'call/:name', component: CallComponent,  canActivate: [AuthGuard] },
   { path: 'call/:name/:fromListOfAct', component: CallComponent,  canActivate: [AuthGuard] },
   { path: 'chat/:name/:fromListOfAct', component: ChatComponent,  canActivate: [AuthGuard] },
   { path: 'chat/:name', component: ChatComponent,  canActivate: [AuthGuard] },
   { path: 'answerCall', component: CallComponent , canActivate: [AuthGuard] },
     { path: 'listOfAct', component: ListOfActComponent,  canActivate: [AuthGuard] },
     { path: 'login', component: LoginComponent,  },
   { path: '', redirectTo: 'login', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload', useHash: true})],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService,  
   /*  {
    provide: RouteReuseStrategy,
    useClass: CustomRouteReuseStrategy
  } */
]
})
export class AppRoutingModule { }
