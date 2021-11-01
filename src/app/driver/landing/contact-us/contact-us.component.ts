import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactUsMessageService} from "../../../service/contact-us-message.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: [
      './contact-us.component.scss',
    '../../common.css',
    '../../bootstrap.scss',
    '../../../../assets/style/owlcarousel/assets/owl.carousel.min.css',
    '../../../../assets/style/tempusdominus/css/tempusdominus-bootstrap-4.min.css'
  ]
})
export class ContactUsComponent implements OnInit {

  public frm: FormGroup;
  constructor(private fb: FormBuilder, private contactUsMessageService: ContactUsMessageService) { }

  ngOnInit(): void {
      let email = localStorage.getItem("email");
    this.frm = this.fb.group({
          name: [null, Validators.compose([Validators.required])],
          email: [email, Validators.compose([Validators.required])],
          subject: [null, Validators.compose([Validators.required])],
          message: [null, Validators.compose([Validators.required])],
    })
  }

  submit() {
      this.contactUsMessageService.add(this.frm.value)
          .subscribe(value => {

          })
  }
}
