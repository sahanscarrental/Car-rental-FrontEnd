import { Component, OnInit } from '@angular/core';
import {AddonService} from "../../service/addon.service";
import {FileService} from "../../../service/file.service";

@Component({
  selector: 'app-addon-list',
  templateUrl: './addon-list.component.html',
  styleUrls: ['./addon-list.component.scss']
})
export class AddonListComponent implements OnInit {

  public imgUrl = "";
  constructor(private addonService: AddonService, public fileService: FileService) {
    this.imgUrl = fileService.url;
  }
  addonList: Object = [];
  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.addonService.getAll().subscribe(value => {
      // @ts-ignore
      this.addonList = value.body;
    })
  }

  addAddon(index) {
    const addOn = this.addonList[index];
    addOn.availableCount += 1;
    addOn.totalCount += 1;
    this.addonList[index] = addOn;
  }

  reduceAddon(index) {
    const addOn = this.addonList[index];
    addOn.availableCount -= 1;
    addOn.totalCount -= 1;
    this.addonList[index] = addOn;
  }

  delete(id: any) {
    this.addonService.delete(id).subscribe(value => {
      this.getAll();
    });
  }

  update(addOn: any) {
    this.addonService.update(addOn.id, addOn).subscribe(value => {
      this.getAll();
    });
  }

}
