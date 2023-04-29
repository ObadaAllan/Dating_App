import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  baseURL='https://localhost:44316/api/';
  validationErrors:string[]=[];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }


    Get404Error()
    {
      this.http.get(this.baseURL+'buggy/not-found').subscribe(response=>{
        console.log(response)
      },error=>{
        console.log(error.error);
      });
    }

    Get400Error()
    {
      this.http.get(this.baseURL+'buggy/bad-request').subscribe(response=>{
        console.log(response)
      },error=>{
        console.log(error)
      });
    }
    Get500Error()
    {
      this.http.get(this.baseURL+'buggy/server-error').subscribe(response=>{
        console.log(response)
      },error=>{
        console.log(error)
      });
    }
    Get401Error()
    {
      this.http.get(this.baseURL+'buggy/auth').subscribe(response=>{
        console.log(response);
      },error=>{
        console.log(error)
      });
    }

    Get400ValidationError()
    {
      this.http.post(this.baseURL+'Account/register',{}).subscribe(response=>{
        console.log(response);
      },errors=>{
        console.log(errors);
        this.validationErrors=errors
      });
    }
    
}
