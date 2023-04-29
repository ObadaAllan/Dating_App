import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private accountservice:AccountService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  register()
  {
    this.accountservice.register(this.model).subscribe(res=>{
      console.log(res);
      this.cancel();
    },error=>{
      console.log(error);
    this.toastr.error(error.error);
    })
  }
  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
