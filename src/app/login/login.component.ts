import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm=new FormGroup({
    email:new FormControl(null,[ Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    password:new FormControl(null,[Validators.required, Validators.minLength(4),Validators.maxLength(12)])
  })


email: string = '';
password: string = '';
isAuthenticated:boolean=false

constructor(private authService:LoginService,private http:HttpClient,  private router: Router) {}

 
getControls(name:any){
  return this.loginForm.get(name)
}

login(){
  this.http.get<any>("http://localhost:3000/user")
  .subscribe(res=>{
    const user=res.find((a:any)=>{
      return a.email ===this.loginForm.value.email && a.password ===this.loginForm.value.password 
    });

    if(user){
      this.isAuthenticated=true
      alert("Login Successfully");
      this.loginForm.reset()
      this.router.navigate(['home'])

    }
    else{
      alert("User not Found")
    }
    
  },
  err=>{
    alert("Something Went wrong")
  })
}


}
