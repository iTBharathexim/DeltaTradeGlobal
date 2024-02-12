import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomConfirmDialogModelService {
  message:any='Dummmmmp';
  titleheader:any=[];
  INPUT_VALUES:any=[];
  CALLBACKS:any=Function;
  ButtonName:any=''
  url:any='';
  TYPE_OF_COMMENTS: string = '';
  constructor() { }
}
