import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { cwd } from 'process';
import { user } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating app';


  constructor(private accountService:AccountService)
  {}

  users:any;

  ngOnInit()
  {
    this.setCurrentUser();
  }

  setCurrentUser()
  {
    const user:user = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

}
