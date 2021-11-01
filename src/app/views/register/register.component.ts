import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, RequiredValidator, Validators} from "@angular/forms";
import {FileService} from "../../service/file.service";
import {DriverService} from "../../admin/service/driver.service";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import { CustomValidators } from '../../validators/custom-validators';
import {CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'register.component.html',
    styleUrls: ['register.css']
})
export class RegisterComponent implements OnInit{

    public frmSignup: FormGroup;
    public registerForm: FormGroup;
    public documentType = 'O';
    public today: any;

    constructor(
        private fileService: FileService,
        private driverService: DriverService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private toastrService: ToastrService
    ) {
    }

    lettersOnly(e) {
        const keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode > 47 && keyCode < 58) {
            e.preventDefault();
        }
    }

    numbersOnly(e) {
        const keyCode = (e.keyCode ? e.keyCode : e.which);
        const invalidChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+'];
        // 48 -> 0,56 -> 8, 57 -> 9, 96 -> Numpad 0, 105 -> Numpad 9
        if ((keyCode < 48) || (keyCode > 57 && keyCode < 96) || (keyCode > 105)) {
            e.preventDefault();
        } else if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    }

    ngOnInit(): void {
       this.registerForm = this.createSignupForm();
        let theDate = new Date();
        let dd = String(theDate.getDate()).padStart(2, '0');
        let mm = String(theDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = theDate.getFullYear();
        let t = yyyy + '-' + mm + '-' + dd + 'T12:00';
        this.today = t;
    }

    public accountCreated: boolean = false;

    public licenceFrontImageUrl: string = "";
    public utilityBillUrl: string = "";
    public bankStatementUrl: string = "";
    public councilTaxImageUrl: string = "";
    public faceImageUrl: string = "";


    public licenceFrontImageFile: any = "";
    public utilityBillFile: any = "";
    public bankStatementFile: any = "";
    public councilTaxImageFile: any = "";
    public faceImageFile: any = "";

    separateDialCode = false;
    SearchCountryField = SearchCountryField;
    CountryISO = CountryISO;
    PhoneNumberFormat = PhoneNumberFormat;
    preferredCountries: CountryISO[] = [CountryISO.SriLanka, CountryISO.India];

    changePreferredCountries() {
        this.preferredCountries = [CountryISO.SriLanka, CountryISO.India];
    }

    createSignupForm(): FormGroup {
        return this.fb.group(
            {
                name: [null, Validators.compose([
                    Validators.required])
                ],
                email: [null, Validators.compose([
                    Validators.email,
                    Validators.required]
                )],
                password: [null, Validators.compose([
                    Validators.required,
                    CustomValidators.patternValidator(/\d/, { hasNumber: true }),
                    CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                    CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
                    Validators.minLength(8)
                ])],
                confirmedPassword: [null, Validators.compose([
                    Validators.required, Validators.minLength(8), Validators.maxLength(8)])],
                address: [null, Validators.compose([Validators.required])],
                dob: [null, Validators.compose([Validators.required])],
                nic: [null, Validators.compose([
                ])],
                licenceNo: [null, Validators.compose([
                    Validators.required, Validators.maxLength(8),  Validators.minLength(8)])],
                phoneNo: [ null, Validators.compose([Validators.required])],
                terms: [ false, Validators.compose([Validators.requiredTrue])],
                faceImageId: [],
                licenceFrontImageId: [],
                utilityBillId: [],
                bankStatementId: [],
                councilTaxImageId: []
            }, {
                validator: CustomValidators.passwordMatchValidator
            });
    }

    emailVerifyForm = new FormGroup({
        otp: new FormControl('', [Validators.required, Validators.min(0)]),
    })
    // registerForm = new FormGroup({
    //     name: new FormControl([null, Validators.compose([
    //         Validators.required,Validators.email,])
    //     ]),
    //     address: new FormControl('bnkj njk n kjn kj', Validators.required),
    //     email: new FormControl([[null, Validators.compose([
    //         Validators.required])
    //     ]]),
    //     password: new FormControl('1234', Validators.required),
    //     confirmedPassword: new FormControl('1234', Validators.required),
    //     dob: new FormControl('', Validators.required),
    //     nic: new FormControl('51615151516', Validators.required),
    //     licenceNo: new FormControl('5161616165', Validators.required),
    //     phoneNo: new FormControl('41515151', Validators.required),
    //
    //     licenceFrontImageId: new FormControl(''),
    //     utilityBillId: new FormControl(''),
    //     bankStatementId: new FormControl(''),
    //     nicFrontImageId: new FormControl(''),
    //     nicBackImageId: new FormControl(''),
    //     faceImageId: new FormControl(''),
    // });


    submit() {
        const registerData = this.registerForm.value;
        delete registerData.terms;
        this.driverService.add({...registerData, phoneNo: this.registerForm.value.phoneNo.e164Number})
            .subscribe(value1 => {
                console.log(value1);
                this.accountCreated = true;
            });
    }

    onFileChanged(event, key: string) {
        let reader = new FileReader();
        // @ts-ignore
        if (event.target.files && event.target.files.length > 0) {
            // @ts-ignore
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (key == 'licenceFrontImage') {
                    // @ts-ignore
                    this.licenceFrontImageUrl = reader.result;
                    this.licenceFrontImageFile = file;
                    // uploading front image id
                    this.fileService.upload(this.licenceFrontImageFile)
                        .subscribe(value => {
                            this.registerForm.patchValue({
                                licenceFrontImageId: value.body.id
                            });
                        });
                }
                if (key == 'utilityBill') {
                    // @ts-ignore
                    this.utilityBillUrl = reader.result;
                    this.utilityBillFile = file;
                    // uploading the utility bill
                    this.fileService.upload(this.utilityBillFile)
                        .subscribe(value1 => {
                            this.registerForm.patchValue({
                                utilityBillId: value1.body.id
                            });
                        });
                }
                if (key == 'bankStatement') {
                    // @ts-ignore
                    this.bankStatementUrl = reader.result;
                    this.bankStatementFile = file;
                    // uploading the bank statement
                    this.fileService.upload(this.bankStatementFile)
                        .subscribe(value1 => {
                            this.registerForm.patchValue({
                                bankStatementId: value1.body.id
                            });
                        });
                }
                if (key == 'councilTaxImage') {
                    // @ts-ignore
                    this.councilTaxImageUrl = reader.result;
                    this.councilTaxImageFile = file;
                    // uploading the council tax file
                    this.fileService.upload(this.councilTaxImageFile)
                        .subscribe(value1 => {
                            this.registerForm.patchValue({
                                councilTaxImageId: value1.body.id
                            });
                        });
                }
                if (key == 'faceImage') {
                    // @ts-ignore
                    this.faceImageUrl = reader.result;
                    this.faceImageFile = file;
                    // uploading the face image
                    this.fileService.upload(this.faceImageFile)
                        .subscribe(value => {
                            this.registerForm.patchValue({
                                faceImageId: value.body.id
                            });
                        });
                }
            };
        }
    }

    otpSubmit() {
        let otp = this.emailVerifyForm.value.otp;
        this.authService.emailVerify(otp, this.registerForm.value.email)
            .subscribe(value => {
                // @ts-ignore
                const status = value.body;
                console.log(status);
                if (status) {
                    this.toastrService.success('Account is authorized', 'Success');
                    this.router.navigate(['/login']);
                } else {
                    this.toastrService.error('Invalid OTP', 'Error');
                }
            });
    }

    selectDoc(u: string) {
        this.documentType = u;
    }

    checkErrors() {
        console.log(this.registerForm);
    }

    routeToLogin() {
        this.router.navigate(['/login']);
    }
}
