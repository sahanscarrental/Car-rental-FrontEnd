import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../validators/custom-validators';
import { FileService } from '../../../service/file.service';
import { DriverService } from '../../../admin/service/driver.service';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.scss']
})
export class DriverProfileComponent implements OnInit {

  public registerForm: FormGroup;
  public documentType = 'U';

  public licenceFrontImageUrl: string = '';
  public utilityBillUrl: string = '';
  public bankStatementUrl: string = '';
  public councilTaxImageUrl: string = '';
  public faceImageUrl: string = '';


  public licenceFrontImageFile: any = '';
  public utilityBillFile: any = '';
  public bankStatementFile: any = '';
  public councilTaxImageFile: any = '';
  public faceImageFile: any = '';

  public driver: any = null;
  private imgUrl: string;
  private driverDOB: string;

  constructor(
      private fileService: FileService,
      private driverService: DriverService,
      private authService: AuthService,
      private router: Router,
      private fb: FormBuilder,
      private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.createSignUpForm();
    this.driver = history.state.driver;
    this.registerForm.patchValue(this.driver);
    this.imgUrl = this.fileService.url;

    if (this.driver) {
        if (this.driver.dob) {
            this.driverDOB = this.driver.dob.split('T')[0];
        }
        // to view the uploaded document by default
        if (this.driver.utilityBillId) {
            this.documentType = 'U';
        } else if (this.driver.bankStatementId) {
            this.documentType = 'B';
        } else if (this.driver.councilTaxImageId) {
            this.documentType = 'N';
        }
    }
  }


  createSignUpForm(): FormGroup {
    return this.fb.group(
        {
          name: [null, Validators.compose([
            Validators.required])
          ],
          email: [null, Validators.compose([
            Validators.email,
            Validators.required]
          )],
          address: [null, Validators.compose([Validators.required])],
          dob: [null, Validators.compose([Validators.required])],
          nic: [null, Validators.compose([
          ])],
          licenceNo: [null, Validators.compose([
            Validators.required, Validators.maxLength(8),  Validators.minLength(8)])],
          phoneNo: [ null, Validators.compose([Validators.required])],
          faceImageId: [],
          licenceFrontImageId: [],
          utilityBillId: [],
          bankStatementId: [],
          councilTaxImageId: []
        });
  }

  selectDoc(u: string) {
    this.documentType = u;
  }

  onFileChanged(event, key: string) {
    const reader = new FileReader();
    // @ts-ignore
    if (event.target.files && event.target.files.length > 0) {
      // @ts-ignore
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (key == 'licenceFrontImage') {
          // @ts-ignore
          this.licenceFrontImageUrl = reader.result;
          this.licenceFrontImageFile = file;
          // uploading front image id
          this.fileService.upload(this.licenceFrontImageFile)
              .subscribe(value => {
                this.driver.licenceFrontImageId =  value.body.id;
                /*this.registerForm.patchValue({
                  licenceFrontImageId: value.body.id
                });*/
              });
        }
        if (key == 'utilityBill') {
          // @ts-ignore
          this.utilityBillUrl = reader.result;
          this.utilityBillFile = file;
          // uploading the utility bill
          this.fileService.upload(this.utilityBillFile)
              .subscribe(value1 => {
                this.driver.utilityBillId =  value1.body.id;
                /*this.registerForm.patchValue({
                  utilityBillId: value1.body.id
                });*/
              });
        }
        if (key == 'bankStatement') {
          // @ts-ignore
          this.bankStatementUrl = reader.result;
          this.bankStatementFile = file;
          // uploading the bank statement
          this.fileService.upload(this.bankStatementFile)
              .subscribe(value1 => {
                  this.driver.bankStatementId =  value1.body.id;
              });
        }
        if (key == 'councilTaxImage') {
          // @ts-ignore
          this.councilTaxImageUrl = reader.result;
          this.councilTaxImageFile = file;
          // uploading the council tax file
          this.fileService.upload(this.councilTaxImageFile)
              .subscribe(value1 => {
                  this.driver.councilTaxImageId =  value1.body.id;
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

  update() {
    this.driverService.update({...this.driver, driverState: 'ADMIN_DECISION_PENDING'})
        .subscribe(value => {
          this.driverService.currentDriver = value.body;
          this.router.navigate(['/driver']);
        });
  }
}
