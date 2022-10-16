import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={};
  constructor(public AccountService:AccountService) { }

  ngOnInit(): void 
  {

  }

  login()
  {
  this.AccountService.login(this.model).subscribe(respone=>{
    console.log(respone);
  },error=>{
    console.log(error);
  });
  
  }

  logout()
  {
    this.AccountService.logout();
  }

  

}
