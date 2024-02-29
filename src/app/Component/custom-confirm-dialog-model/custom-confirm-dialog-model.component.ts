import { Component, Injectable, OnInit, forwardRef } from '@angular/core';
import { CustomConfirmDialogModelService } from './custom-confirm-dialog-model.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
declare var $: any;

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomConfirmDialogModelComponent),
  multi: true,
};

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'confirm-dialog-model',
  templateUrl: './custom-confirm-dialog-model.component.html',
  styleUrls: ['./custom-confirm-dialog-model.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})

export class CustomConfirmDialogModelComponent implements OnInit {
  titleheader: any = '';
  message:any= 'Are you sure you want to exit?';
  MODEL_TYPE_VIEW: any = {
    ConfirmDialog: false,
    Custom_Model: false,
    DropDownInputConfirmDialog: false,
    InputConfirmDialog: false,
    IframeModel: false,
    YesNoDialogModel: false,
    DropDownInput: false,
    Notification_DialogModel: false,
    YesDialogModel:false
  };
  DATA_RECIVED: any = [];
  DownloadStatus: boolean = false;
  COMMENTS_LIST: any = {
    Transaction: [{ value: 'MAKER' }, { value: 'CHECKER' }, { value: 'APPROVER' }],
    Summary: [{ value: 'Wrong Entry' }, { value: 'Missing Entry' }, { value: 'Duplicate Entry' }]
  }

  constructor(public CustomConfirmDialogModel: CustomConfirmDialogModelService) {
    this.HIDE_ALL_MODELS('');
  }

  ConfirmDialogModel(titleheader: any, message: any, callback: any) {
    this.HIDE_ALL_MODELS('ConfirmDialog');
    this.CustomConfirmDialogModel.titleheader = titleheader;
    this.CustomConfirmDialogModel.message = message;
    $('.custommodel').css('display', 'block');
    window.scroll(0, 0)
  }

  Confirm_DialogModel(title_header: any, message: any) {
    this.HIDE_ALL_MODELS('Custom_Model');
    this.CustomConfirmDialogModel.titleheader = title_header;
    this.CustomConfirmDialogModel.message = message;
    $('.Custom_Model').css('display', 'flex');
    window.scroll(0, 0)
  }

  timeout: any = ''
  Notification_DialogModel(title_header: any, message: any) {
    clearTimeout(this.timeout);
    this.HIDE_ALL_MODELS('Notification_DialogModel');
    this.CustomConfirmDialogModel.titleheader = title_header;
    this.CustomConfirmDialogModel.message = message;
    $('.Notification_DialogModel').css('display', 'flex');
    this.timeout = setTimeout(() => { $('.Notification_DialogModel').css('display', 'none'); }, 10000)
    window.scroll(0, 0)
  }

  DropDownConfirmDialogModel(titleheader: any, message: any, type: string = 'Summary', callback: Function) {
    this.HIDE_ALL_MODELS('DropDownInputConfirmDialog');
    $('.input-remove').val('');
    this.CustomConfirmDialogModel.titleheader = titleheader;
    this.CustomConfirmDialogModel.message = message;
    $('.DropDownInputConfirmDialog').css('display', 'block');
    this.CustomConfirmDialogModel.CALLBACKS = callback;
    window.scroll(0, 0);
    this.CustomConfirmDialogModel.TYPE_OF_COMMENTS = type;
  }

  InputConfirmDialogModel(titleheader: any, message: any, callback: Function) {
    this.HIDE_ALL_MODELS('InputConfirmDialog');
    $('.input-remove').val('');
    this.CustomConfirmDialogModel.titleheader = titleheader;
    this.CustomConfirmDialogModel.message = message;
    $('.InputConfirmDialog').css('display', 'block');
    this.CustomConfirmDialogModel.CALLBACKS = callback;
  }

  public IframeConfirmDialogModel(titleheader: any, url: any, downloadShow: boolean,buttonName:string='', callback: Function): any {
    this.HIDE_ALL_MODELS('IframeModel').then((res: any) => {
      if (res == true) {
        this.MODEL_TYPE_VIEW['IframeModel'] = true;
        $('.input-remove').val('');
        $('.iframecustommodel').css('display', 'block');
        this.CustomConfirmDialogModel.titleheader = titleheader;
        this.CustomConfirmDialogModel.url = url;
        this.CustomConfirmDialogModel.CALLBACKS = callback;
        this.DownloadStatus = downloadShow
        window.scroll(0, 0);
        this.CustomConfirmDialogModel.ButtonName=buttonName;
      }
    });
  }

  YesNoDialogModel(titleheader: any, message: any, callback: Function,TitleStyle:any={},HeaderStyle:any={}) {
    this.HIDE_ALL_MODELS('YesNoDialogModel').then((res:any)=>{
      $('.input-remove').val('');
      this.CustomConfirmDialogModel.titleheader = titleheader;
      this.CustomConfirmDialogModel.message = message;
      $('.YesNoDialogModel').css('display', 'flex');
      this.CustomConfirmDialogModel.TitleStyle=TitleStyle;
      this.CustomConfirmDialogModel.HeaderStyle=HeaderStyle;
      this.CustomConfirmDialogModel.CALLBACKS = callback;
      window.scroll(0, 0)
      console.log("sgsdfgdfgdfgdgfd")
    });
  }

  YesDialogModel(titleheader: any, message: any, callback: Function) {
    this.HIDE_ALL_MODELS('YesDialogModel');
    $('.input-remove').val('');
    this.CustomConfirmDialogModel.titleheader = titleheader;
    this.CustomConfirmDialogModel.message = message;
    $('.YesDialogModel').css('display', 'flex');
    this.CustomConfirmDialogModel.CALLBACKS = callback;
    window.scroll(0, 0)
  }

  DropDownInput(event: any, data: any, callback: Function) {
    this.HIDE_ALL_MODELS('DropDownInput');
    $('.input-remove').val('');
    this.CustomConfirmDialogModel.message = data;
    $('.DropDownInput').css('display', 'none');
    callback($('.DropDownInput').html());
    window.scroll(0, 0)
  }

  ngOnInit(): void {
  }

  HIDE_ALL_MODELS(Changekey: any) {
    return new Promise((resolve, reject) => {
      let OBJECT_KEYS: any = Object.keys(this.MODEL_TYPE_VIEW);
      for (let index = 0; index < OBJECT_KEYS.length; index++) {
        this.MODEL_TYPE_VIEW[OBJECT_KEYS[index]] = false;
        if ((index + 1) == OBJECT_KEYS.length) {
          this.MODEL_TYPE_VIEW[Changekey] = true;
          resolve(true);
        }
      }
    })
  }
  
  CALLBACKS_CALL(value: any, popupclose: any) {
    this.CustomConfirmDialogModel.CALLBACKS({ value: value.Inputdata })
  }
  
  PopUpCallBack(value:any){
    this.CustomConfirmDialogModel?.CALLBACKS(value)
  }
}
