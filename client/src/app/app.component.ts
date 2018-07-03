import { Component, OnInit } from '@angular/core';
import { DataService } from './chat/shared/services/data.service';
import { FormData } from './chat/shared/model/data';
import { Router} from '@angular/router'


@Component({
  selector: 'tcc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formData: FormData;
  ngOnInit(): void {  
    
  }

 constructor(private dataService: DataService, private router: Router) {
    }
    showLogout()
    {
      return this.dataService.getFormData().loggedIn == true;
    }
    Logout(){
      this.router.navigate(['/login']);
    }

    
}
