import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from './chat/shared/services/data.service';
import { FormData } from './chat/shared/model/data';
import { Router} from '@angular/router'

declare var clearStorage: any
@Component({
  selector: 'tcc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formData: FormData;
  showLogout : boolean;
  ngOnInit(): void {  
    clearStorage();
    this.showLogout = this.dataService.getFormData().loggedIn == false;
  }

 constructor(private dataService: DataService, private router: Router) {
    }

    Logout(){   
      debugger;
      this.dataService.resetFormData();
      this.router.navigate(['/login']);      
    }
  //ngAfterView

    
}
