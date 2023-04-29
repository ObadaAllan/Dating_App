import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(public AccountService:AccountService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void 
  {

  }

  login()
  {
  this.AccountService.login(this.model).subscribe(respone=>{
    this.router.navigateByUrl("/members");
  });
  
  }

  logout()
  {
    this.AccountService.logout();
    this.router.navigateByUrl("/");
  }

  

}
