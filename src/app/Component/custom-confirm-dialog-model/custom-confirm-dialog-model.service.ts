import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomConfirmDialogModelService {
  message:any='Are you sure you want to exit?';
  titleheader:any="Confirm";
  INPUT_VALUES:any=[];
  CALLBACKS:any=Function;
  ButtonName:any=''
  url:any='';
  TYPE_OF_COMMENTS: string = '';
  TitleStyle:any={};
  HeaderStyle:any={};
  constructor() { }
}
