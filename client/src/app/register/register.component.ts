import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { user } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model:any={};

  constructor(private accountservice:AccountService) { }

  ngOnInit(): void {
  }

  register()
  {
    this.accountservice.register(this.model).subscribe(res=>{
      console.log(res);
      this.cancel();
    },error=>{
      console.log(error);
    })
  }
  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
