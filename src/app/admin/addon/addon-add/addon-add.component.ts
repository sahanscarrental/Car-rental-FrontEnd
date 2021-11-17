import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AddonService} from "../../service/addon.service";
import {FileService} from "../../../service/file.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-addon-add',
  templateUrl: './addon-add.component.html',
  styleUrls: ['./addon-add.component.scss']
})
export class AddonAddComponent implements OnInit {

  constructor(private addonService: AddonService, private fileService: FileService, private router: Router) { }

  public url = "";
  vehicleForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    imageId: new FormControl(''),
    image: new FormControl(''),
    availableCount: new FormControl(0),
    bookedCount: new FormControl(0),
    totalCount: new FormControl(0)
  });

  ngOnInit(): void {
    this.listenToTotalCountChange();
  }

  addAddon() {
    this.vehicleForm.patchValue({
      totalCount : this.vehicleForm.controls['totalCount'].value + 1
    });
  }

  reduceAddon() {
    this.vehicleForm.patchValue({
      totalCount : this.vehicleForm.controls['totalCount'].value - 1
    });
  }

  listenToTotalCountChange() {
    this.vehicleForm.controls['totalCount'].valueChanges.subscribe(
        changedValue => {
          this.vehicleForm.patchValue({
            availableCount : changedValue,
          });
        });
  }

  submit() {
    this.fileService.upload(this.vehicleForm.get('image').value)
        .subscribe(value => {
          this.vehicleForm.patchValue({
            imageId: value.body.id
          });
          this.addonService.add(this.vehicleForm.value).subscribe(value => {
            this.router.navigate(['/dashboard/addon/list']);
          })
        }, error => {
          console.log(error)
        })
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        // @ts-ignore
        this.url = reader.result;
      }
      this.vehicleForm.patchValue({
        image: file
      });
    }
  }
}
