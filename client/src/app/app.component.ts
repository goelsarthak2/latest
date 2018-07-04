import { Component, OnInit } from '@angular/core';
import { DataService } from './chat/shared/services/data.service';
import { FormData } from './chat/shared/model/data';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

declare var clearStorage: any
@Component({
  selector: 'tcc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formData: FormData;
  showLogout : boolean;
  subscription: Subscription;
  selectedEmployeeCountRadioButton: string = 'All';
  ngOnInit(): void {  
    clearStorage();
    this.showLogout = this.dataService.getFormData().loggedIn == false;
  }

 constructor(private dataService: DataService, private router: Router) {
  this.subscription = this.dataService.getData().subscribe(x => {
    debugger;
    this.showLogout = x; 
  });
    }

    Logout(){   
      debugger;
      this.dataService.resetFormData();
      this.router.navigate(['/login']);      
    } 

    
}
