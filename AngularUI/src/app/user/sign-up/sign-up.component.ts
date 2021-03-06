import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../shared/user.service'


//Firebase
import { AuthService } from '../../auth/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
// export class SignUpComponent implements OnInit {
//   regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   showSucessMessage: boolean;
//   serverErrorMessages: string;

//   constructor(private service: UserService) { }

//   ngOnInit() {
//   }

//   onSubmit(form: NgForm) {
//     this.service.postUser(form.value).subscribe(
//       res => {
//         this.showSucessMessage = true;
//         setTimeout(() => this.showSucessMessage = false, 4000);
//         this.resetForm(form);
//       },
//       err => {
//         if (err.status === 422) {
//           this.serverErrorMessages = err.error.join('<br/>');
//         }
//         else
//           this.serverErrorMessages = 'Something went wrong. Please try again later.';
//       }
//     );
//   }

//   resetForm(form: NgForm) {
//     this.service.user = {
//       fullName: '',
//       lastName: '',
//       email: '',
//       password: ''
//     };
//     form.resetForm();
//     this.serverErrorMessages = '';
//   }

// }

export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
   }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['',Validators.required]
     });
   }

   tryGoogleLogin(){
     this.authService.doGoogleLogin()
     .then(res =>{
       this.router.navigate(['/user']);
     }, err => console.log(err)
     )
   }

   tryRegister(value){
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created";
       // After the user signs up, Firebase automatically authenticates
       // the user and logs the user in immdeiately. We don't want this. 
       // We want to sign up the user but logging them out in the background
       // To prevent auto-login.
       this.authService.doLogout();
       setTimeout(() => {
        this.successMessage = "Navigating back to login page..";
       },
      1000);
       setTimeout(() => {
        this.router.navigate(['/login']);
       },
      3000);
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
   }

}