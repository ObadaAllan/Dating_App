import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { cwd } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating app';


  constructor(private http:HttpClient)
  {}

  users:any;

  ngOnInit()
  {
    this.getUsers();
  }

  getUsers()
  {
    this.http.get('https://localhost:5001/Api/Users').subscribe(Response=>{
      this.users=Response;
    },error=>{
      console.log(error);
    });
  }

}
