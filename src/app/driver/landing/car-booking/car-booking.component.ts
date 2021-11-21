import { Component, OnInit } from '@angular/core';
import {FileService} from "../../../service/file.service";
import {DriverService} from "../../../admin/service/driver.service";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AddonService} from "../../../admin/service/addon.service";
import {BookingRecordService} from "../../../admin/service/booking-record.service";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-booking',
  templateUrl: './car-booking.component.html',
  styleUrls: [
      './car-booking.component.scss',
    '../../common.css',
    '../../bootstrap.scss',
    '../../../../assets/style/owlcarousel/assets/owl.carousel.min.css',
    '../../../../assets/style/tempusdominus/css/tempusdominus-bootstrap-4.min.css'
  ]
})
export class CarBookingComponent implements OnInit {

  public imgUrl = "";
  private addonIds: string[] = [];
  public today: string;
  public minimumDropOffDay: string;
  public max1: string;
  public max2: string;
  public max3: string;
  public minimumExtendTime: string;
  public maximumExtendTime: string;
  public pick: string;
  public previousBookingRecords: any[] = null;
  public hasCompletedBooking: boolean = false;
  public disableReturnAtNight = false;
  public formattedPickUp;
  public formattedDropOff;


  constructor(
      private bookingRecordService: BookingRecordService,
      private _formBuilder: FormBuilder,
      public fileService: FileService,
      private driverService: DriverService,
      private addonService: AddonService,
      private authService: AuthService,
      private router: Router,
      private toastrService: ToastrService
  ) {
    this.imgUrl = fileService.url;
  }


  bookingForm = new FormGroup({
    pickUpTime: new FormControl(''),
    dropTime: new FormControl(''),
    extendedDropTime: new FormControl(''),
    returnAtNight: new FormControl(''),
    addons: new FormControl(''),
    id: new FormControl(''),

    vehicle: new FormControl(''),
    vehicleDriver: new FormControl(''),
  });

  private listenToDateChange() {
    this.bookingForm.controls['pickUpTime'].valueChanges.subscribe(
        pickUpTimeChange => {
          this.minimumDropOffDay = pickUpTimeChange;
        }
    );

    this.bookingForm.controls['dropTime'].valueChanges.subscribe(
        change => {
          console.log('dropTime: ', change);
        }
    );

    this.bookingForm.controls['extendedDropTime'].valueChanges.subscribe(
        change => {
          console.log('extendedDropTime: ', change);
        }
    );
  }

  private loadPreviousBookingsOfDriver() {
    this.bookingRecordService.getAll(this.authService.driver.id)
        .subscribe(value => {
          this.previousBookingRecords = value.body;
          // check for any records where in COMPLETED state
          if (this.previousBookingRecords) {
            const completedBookings = this.previousBookingRecords.filter(record => record.bookingRecordState === 'COMPLETED');
            this.hasCompletedBooking = completedBookings && completedBookings.length > 0;
          }
        }, error => {
          console.log(error);
        });
  }


  public car: any = null;
  public bookingRecord: any = null;
  public driver: any = null;
  public addons: any = null;
  ngOnInit(): void {
    let theDate = new Date();
    let dd = String(theDate.getDate()).padStart(2, '0');
    let mm = String(theDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = theDate.getFullYear();
    let t = yyyy + '-' + mm + '-' + dd + 'T12:00:00';
    this.today = t;
    this.minimumDropOffDay = this.today;
    theDate.setMonth(theDate.getMonth()+6);
    dd = String(theDate.getDate()).padStart(2, '0');
    mm = String(theDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = theDate.getFullYear();
    let m1 = yyyy + '-' + mm  + '-' + dd + 'T12:00:00';
    this.max1 = m1;  // max pickup date


    theDate.setDate(theDate.getDate()+14);
    dd = String(theDate.getDate()).padStart(2, '0');
    mm = String(theDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = theDate.getFullYear();
    let m2 = yyyy + '-' + mm  + '-' + dd + 'T12:00:00';
    this.max2 = m2; // max drop of date

    this.addonService.getAllAvailable()
        .subscribe(value => {
          this.addons = value.body
        }, error => {
          console.log(error);
        });

    this.driverService.get(this.authService.driver.id)
        .subscribe(value => {
          this.driver = value.body;
          this.bookingForm.patchValue({
            vehicleDriver: this.driver
          });
        }, error => {
          console.log(error);
        })

    if (history.state.car) {
      this.car = history.state.car;
    } else {
      this.car = JSON.parse(localStorage.getItem('car'));
    }

    console.log('past bookingRecord from: ', this.bookingRecord);
    if (history.state.bookingRecord) {
      this.bookingRecord = history.state.bookingRecord;
      // only allow to check return at night, only if the booking is pending
      this.disableReturnAtNight = this.bookingRecord.bookingRecordState !== 'PENDING';
      this.bookingForm.patchValue(this.bookingRecord);
      console.log('past pickup time: ', this.bookingRecord.pickUpTime);
      console.log('past drop time: ', this.bookingRecord.dropTime);
      this.minimumExtendTime = this.bookingRecord?.dropTime?.split('.')[0];
      console.log('minimumExtendTime: ', this.minimumExtendTime);
      // max time should be 4p.M of the same day
      this.maximumExtendTime = this.bookingRecord?.dropTime?.split('T')[0] + 'T16:00';
      console.log('maximumExtendTime: ', this.maximumExtendTime);
    }

    if (this.bookingRecord != undefined && this.bookingRecord.addons) {
      this.bookingRecord.addons.forEach(a => this.addonIds.push(a.id))
      theDate = new Date(this.bookingRecord.dropTime);
      dd = String(theDate.getDate()).padStart(2, '0');
      mm = String(theDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      yyyy = theDate.getFullYear();
      t = yyyy + '-' + mm + '-' + dd + 'T16:00:00';
      this.max3 = t;
    }
    this.bookingForm.patchValue({
      vehicle: this.car,
    });

    this.loadPreviousBookingsOfDriver();

    this.listenToDateChange();
  }

  async submit(cancel: boolean = false) {
    let _addons= [];
    await this.addonIds.forEach(ai => {
      const addon = this.addons.find(i => i.id ==ai);
      if (addon) {
        _addons.push(addon);
      }
    });
    this.bookingForm.patchValue({
      addons: _addons
    });
    if (this.bookingRecord == null) {
      const bookingData = this.bookingForm.value;
      this.bookingRecordService.addAsDTO(bookingData)
          .subscribe(value => {
            this.router.navigate(['/driver/home/booking-list']);
          });
    } else {
      // updating the booking record

      if (cancel) {
        this.bookingRecordService.update({
          ...this.bookingRecord,
          addons: _addons,
          extendedDropTime: this.bookingForm.value.extendedDropTime ? this.bookingForm.value.extendedDropTime + ':00.000+00:00' : null,
          bookingRecordState: cancel ? 'CANCELED' : this.bookingRecord.bookingRecordState
        })
            .subscribe(value => {
              if (value.status) {
                this.toastrService.success('Booking Cancelled', 'Success');
                this.router.navigate(['/driver/home/booking-list']);
              }
            }, error => {

            });
      } else if (this.bookingForm.controls['extendedDropTime'].value) {
        this.bookingRecordService.extendDropTime(
            this.bookingRecord.id, this.bookingForm.controls['extendedDropTime'].value).subscribe(
            response => {
              this.toastrService.success('Drop time extended', 'Success');
            }, error1 => {
              console.log('error: ', error1);
            }
        );
      } else {
        this.bookingRecord.returnAtNight = this.bookingForm.controls['returnAtNight'].value;
        this.bookingRecordService.update({
          ...this.bookingRecord,
          addons: _addons,
          extendedDropTime: this.bookingForm.value.extendedDropTime ? this.bookingForm.value.extendedDropTime + ':00.000+00:00' : null,
          bookingRecordState: this.bookingRecord.bookingRecordState
        }).subscribe(value => {
          this.router.navigate(['/driver/home/car-booking']);
        }, error => {
          console.log('update error: ', error);
        });
      }
    }
  }

  addonChange(event) {
    if (event.target.checked) {
      this.addonIds.push(event.target.value);
    } else {
      this.addonIds = this.addonIds.filter(ai => ai !== event.target.value);
    }
  }

  checked(){
    return true;
  }
  isChecked(addon: any) {
    if (this.bookingRecord == null || !this.bookingRecord.addons) {
      return false;
    } else {
      const addonIds: string[] = this.bookingRecord.addons.map(ad => ad.id)
      return addonIds.includes(addon.id);
    }
  }

  cancel() {
    this.submit(true);
  }

  pickChange(event: any) {
    let theDate = new Date(event.target.value);
    theDate.setDate(theDate.getDate()+14);
    let dd = String(theDate.getDate()).padStart(2, '0');
    let mm = String(theDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = theDate.getFullYear();
    let m2 = yyyy + '-' + mm  + '-' + dd + 'T12:00:00';
    this.max2 = m2;
  }
}
