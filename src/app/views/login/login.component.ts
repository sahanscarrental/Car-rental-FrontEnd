import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {validate} from "codelyzer/walkerFactory/walkerFn";
import {AuthService} from "../../service/auth.service";
import {CustomValidators} from "../../validators/custom-validators";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls:['login.css']
})
export class LoginComponent implements OnInit{

  public fought: boolean = false;
  public otpSent: boolean = false;
  public resetForm: FormGroup;
  private email: string;
  public form: string = 'LOGIN';
  public otpStatus: boolean;
  public resetStatus: boolean;
  constructor(private authService: AuthService, private fb: FormBuilder) {
  }
  loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      password: new FormControl(''),
      rememberMe: new FormControl('')
  });

  foughtForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
  });

  emailVerifyForm = new FormGroup({
      otp: new FormControl('', Validators.required),
  })

  login() {
      if (this.loginForm.value.rememberMe){
          localStorage.setItem("email", this.loginForm.value.email);
          localStorage.setItem("password", this.loginForm.value.password);
      }
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  otpRequest() {
      this.email = this.foughtForm.value.email;
      this.authService.otpRequest(this.email)
          .subscribe(value => {
              this.otpSent = true;
              this.form = 'OTP';
          }, error => {
              this.otpSent = true;
              this.form = 'OTP';
          })
  }
  otpSubmit() {
      let otp = this.emailVerifyForm.value.otp;
      this.authService.emailVerify(otp,this.email)
          .subscribe(value => {
              const status = value.body;
              if (status) {
                  this.form = 'RESET'
              }else {
                  this.otpSent = false;
                  this.form = 'FOUGHT'
              }
          })
  }
  reset() {
      this.authService.reset(this.email, this.resetForm.value.password)
          .subscribe(value => {
              this.form = 'LOGIN';
          }, error => {
              this.resetStatus = false;
          })
  }



  ngOnInit(): void {
      let email = localStorage.getItem("email");
      let password = localStorage.getItem("password");
      if (email != null || email != undefined) {
          this.authService.login(email, password);
      }
    this.resetForm = this.fb.group({
          password: [null, Validators.compose([
            Validators.required,
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
            Validators.minLength(8)
          ])],
          confirmedPassword: [null, Validators.compose([Validators.required])],
        },{
          validator: CustomValidators.passwordMatchValidator
        })
  }
}
