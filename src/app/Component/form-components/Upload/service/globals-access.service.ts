import { ElementRef, Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsAccessService {
  BuyerNotFound: ElementRef | any;
  BeneficiaryNotFound: ElementRef | any;
  constructor() { }

  get BuyerNotFoundPanel() {
    return this.BuyerNotFound;
  }

  get BeneficiaryNotFoundPanel() {
    return this.BeneficiaryNotFound;
  }

  setBuyerNotFoundPanel(BuyerNotFound:any) {
    this.BuyerNotFound = BuyerNotFound;
  }

  setBeneficiaryNotFoundPanel(BeneficiaryNotFound:any) {
    this.BeneficiaryNotFound = BeneficiaryNotFound;
  }
}
