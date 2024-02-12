import { AfterViewInit, Component, ElementRef, EventEmitter, Injectable, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UploadServiceValidatorService } from '../service/upload-service-validator.service';
declare var $ :any;

@Component({
  selector: 'form-components',
  templateUrl: './form-components.component.html',
  styleUrls: ['./form-components.component.scss']
})
export class FormComponentsComponent implements OnInit, AfterViewInit {
  SUBMIT_ERROR: boolean = false;
  @Input('label') label: any = '';
  @Input('labelStyle') labelStyle: any = '';
  @Input('FormStyle') FormStyle: any = '';
  @Input('MainStyle') MainStyle: any = '';
  @Input('id') id: any = '';
  @Input('SubmitButtonStyle') SubmitButtonStyle: any = '';
  @Input('ButtonPanelStyle') ButtonPanelStyle: any = '';
  @Input('TypeOfValue') TypeOfValue: any = 'Normal';
  @Input('SubmitName') SubmitName: any = 'Submit';
  @Input('AddNewRequried') AddNewRequried: boolean = false;
  @Output('SubmitEvent') SubmitEvent: any = new EventEmitter();
  @Output('AddNewBank') AddNewBank: any = new EventEmitter();
  @Output('RawValueEvent') RawValue: any = new EventEmitter();
  @Output('BankEvent') BankEvent: any = new EventEmitter();
  @Output('YesNoCheckBoxEvent') YesNoCheckBoxEvent: any = new EventEmitter();
  @Output('SHIPPING_BILL_EVENT') SHIPPING_BILL_EVENT: any = new EventEmitter();
  @Output('CommericalNoEvent') CommericalNoEvent: any = new EventEmitter();
  @Output('AddButton') AddButton: any = new EventEmitter();
  @Output('BL_COPY_EVENT') BL_COPY_EVENT: any = new EventEmitter();
  @Output('BENEFICIARY_EVENT') BENEFICIARY_EVENT: any = new EventEmitter();
  @Output('PIPO_EVENT') PIPO_EVENT: any = new EventEmitter();
  @Input('HIDE_BACKGROUND') HIDE_BACKGROUND: boolean = true;
  @Input('HIDE_SUBMIT_BUTTON') HIDE_SUBMIT_BUTTON: boolean = true;
  @Input('KEY_ENTER_ENABLED') KEY_ENTER_ENABLED: any = false;
  @Input('ADD_NEW_BUTTON_VISIBLE') ADD_NEW_BUTTON_VISIBLE: boolean = false;
  @ViewChild('BuyerNotFoundPanel') BuyerNotFound: ElementRef | any;
  @ViewChild('BeneficiaryNotFoundPanel') BeneficiaryNotFound: ElementRef | any
  @ViewChildren('CommericalNo') CommericalNo?: QueryList<any>;
  @Input('morecontent') morecontent: boolean = false;
  @Input('BUTTON_PANEL_SHOW') BUTTON_PANEL_SHOW: boolean = false;
  @Input('BUTTON_PANEL_HIDE') BUTTON_PANEL_HIDE: boolean = true;
  @Input('SubmitButtonDisabled') SubmitButtonDisabled: boolean = false;
  @Output('DropDownEvent') DropDownEvent: any = new EventEmitter();
  @Output('ArrayList_ObjectEvent') ArrayList_ObjectEvent: any = new EventEmitter();
  @Input("Title") Title:any=''
  
  Account_Type: any = [{
    type: 'OD-over draft'
  }, {
    type: 'CC-cash credit'
  }, {
    type: 'CA-Current account'
  }, {
    type: 'EEFC - Exchange earner Foreign currency'
  }, {
    type: 'PCFC- packing credit Foreign currency'
  }, {
    type: 'EBRD- Bill discounting accoun'
  }];
  LOGIN_TOEKN: any = '';
  POPUP_VISIBLILTY: any = {
    BuyerNotFound: '',
    BeneficiaryNotFound: ''
  }
  HS_CODE_DATA: any = [];

  constructor(public sanitizer: DomSanitizer,
    public toastr: ToastrService,
    public router: Router,
    public validator: UploadServiceValidatorService) { }

  async ngOnInit() {
  }

  get onClickButton() {
    return $('.submit-button#' + this.id).click();
  }

  get resetForm() {
    this.validator.FIELDS_DATA[this.id]?.forEach((element:any) => {
      element['value'] = '';
      this.validator.dynamicFormGroup[this.id]?.controls[element?.fieldName]?.setValue("");
    });
    return this.validator.dynamicFormGroup[this.id]?.reset();
  }
  onSubmit(event: any, e: any) {
    console.log(e, 'from value')
    event.preventDefault();
    if (e?.status == 'VALID') {
      if (this.TypeOfValue == "Normal") {
        this.SubmitEvent.emit(e);
      } else {
        this.SubmitEvent.emit(this.getRawValue);
      }
      this.SUBMIT_ERROR = false;
      this.RawValue.emit(this.getRawValue);
    } else {
      this.RawValue.emit(false);
      this.SUBMIT_ERROR = true;
    }
  }

  get getRawValue() {
    return this.validator.dynamicFormGroup[this.id]?.getRawValue()
  }

  dumpFunc(value: any, callback: any) {
    if (callback != undefined) {
      callback(value)
    }
  }
  get geForm() {
    return this.validator.dynamicFormGroup[this.id];
  }

  setFormValue(value: any, index: any, name1: any, name2: any) {
    this.validator.dynamicFormGroup[this.id]?.controls[name1]?.controls[index]?.controls[name2]?.setValue(value)
  }

  setValue(value: any, name1: any) {
    this.validator.dynamicFormGroup[this.id]?.controls[name1]?.setValue(value)
    this.validator.dynamicFormGroup[this.id].value[name1] = (value)
  }

  addFormArray(key1: any, index: any, data: any, GroupLabel: any) {
    this.validator.buildNewFormArray(key1, index, data['formGroup'][0], this.id, GroupLabel, data).then((res: any) => {
      res?.forEach((element:any) => {
        this.validator.dynamicFormGroup[this.id]?.controls[key1].push(element)
      });
    })
  }

  removeFormArray(key1: any, index: any, labelIndex: any, data: any) {
    this.validator.removeFormArray(key1, index, labelIndex, this.id, data).then((res: any) => { })
  }

  AUTOFILL_INPUT_NAME_LIST: any = [];
  ORM_SELECTION(event: any, index: any, data: any, AUTOFILL_INPUT_NAME_LIST: any, type: any = 'Normal') {
    if (event.target.checked) {
      this.validator.ORM_SELECTION_DATA.push(data);
      if (type == "Normal") {
        AUTOFILL_INPUT_NAME_LIST.forEach((element:any) => {
          this.validator.dynamicFormGroup[this.id]?.controls[element?.input]?.setValue(this.validator.ORM_SELECTION_DATA[element?.key]);
        });
        if (this.CALLBACK != undefined && this.CALLBACK != null && this.CALLBACK != '') {
          this.CALLBACK({ form: this.validator.dynamicFormGroup[this.id], AUTOFILL_INPUT_NAME_LIST: AUTOFILL_INPUT_NAME_LIST, FIELDS_DATA: this.field })
        }
      } else if (type == "formGroup") {
        AUTOFILL_INPUT_NAME_LIST.forEach((element:any) => {
          this.validator.dynamicFormGroup[this.id]?.controls[element?.parent]?.controls[0]?.controls[element?.input]?.setValue(this.validator.ORM_SELECTION_DATA[element?.key]);
        });
      }
      if (this.CALLBACK != undefined && this.CALLBACK != null && this.CALLBACK != '') {
        this.CALLBACK({ form: this.validator.dynamicFormGroup[this.id], AUTOFILL_INPUT_NAME_LIST: AUTOFILL_INPUT_NAME_LIST, FIELDS_DATA: this.field })
      }
    } else {
      this.validator.ORM_SELECTION_DATA.splice(index, 1)
      event.target.checked = false;
    }
  }
  CALLBACK: any = null;
  field: any = null;
  dump(data: any, callback: any = null, field: any = null) {
    console.log(this.AUTOFILL_INPUT_NAME_LIST, callback, "AUTOFILL_INPUT_NAME_LIST")
    this.AUTOFILL_INPUT_NAME_LIST = data;
    this.CALLBACK = callback;
    this.field = field;
  }

  autofillCommerical(Commericaldata: any, AUTOFILL_INPUT_NAME_LIST: any) {
    console.log(Commericaldata, this.CALLBACK, this.AUTOFILL_INPUT_NAME_LIST, "AUTOFILL_INPUT_NAME_LIST")
    AUTOFILL_INPUT_NAME_LIST.forEach((element:any) => {
      this.validator.dynamicFormGroup[this.id]?.controls[element?.name]?.controls[element?.index]?.controls[element?.input]?.setValue(Commericaldata?.data[element?.key])
    });

  }

  CreateFormBank() {
    setTimeout(() => {
      this.validator.buildForm({
        BankName: {
          type: "text",
          value: "",
          label: "Bank Name",
          placeholderText: 'Bank Name',
          rules: {
            required: true,
          },
          maxLength: 200
        },
      }, 'AddNewBankName');
    }, 200);
  }

  addNewBank(e: any, panel: any) {
    
  }

  onAddNewBank() {
    this.AddNewBank.emit(true);
  }

  initialName(words:any) {
    'use strict'
    return words
      .replace(/\b(\w)\w+/g, '$1_')
      .replace(/\s/g, '')
      .replace(/\.$/, '')
      .toUpperCase();
  }

  removeAllSpecialChar(string: any) {
    return string?.replace(/[^a-zA-Z ]/g, "");
  }

  ngAfterViewInit() {
   
  }

  ToHSCode_Selected: any = [];
  ToHSCode(event: any, value: any, index: any) {
    if (event?.target?.checked == true) {
      this.ToHSCode_Selected[index] = value;
    } else {
      this.ToHSCode_Selected[index] = '';
    }
  }

  ALL_DATA_HSCODE: any = '';
  DoneButton() {
    let temp2: any = [];
    this.ToHSCode_Selected.forEach((element:any) => {
      temp2.push(element?.hscode);
    });
    this.ALL_DATA_HSCODE = temp2.join(',');
    this.setValue(this.ALL_DATA_HSCODE, this.HSCODE_FEILD_FORM?.field);
  }

  filtertimeout: any = ''
  FILTER_HS_CODE_DATA: any = [];
  filterHSCode(value: any) {
    clearTimeout(this.filtertimeout);
    this.filtertimeout = setTimeout(() => {
      this.FILTER_HS_CODE_DATA = this.HS_CODE_DATA.filter((item: any) => item?.hscode?.indexOf(value) != -1 || item?.description?.toLowerCase()?.indexOf(value?.toLowerCase()) != -1);
      if (this.FILTER_HS_CODE_DATA.length == 0) {
        this.FILTER_HS_CODE_DATA = this.HS_CODE_DATA;
      }
    }, 200);
  }

  HSCODE_FEILD_FORM: any = {
    id: '',
    field: ''
  }

  ValueAdd(id: any, field: any) {
    this.HSCODE_FEILD_FORM['id'] = id;
    this.HSCODE_FEILD_FORM['field'] = field;
  }

  PUPOSE_CODE_FEILD_FORM: any = {
    id: '',
    field: ''
  }


  SELECT_PURPOSE_CODE(event: any, index: any) {
    console.log(event, 'SELECT_PURPOSE_CODE')
    this.validator.SELECTED_PURPOSE_CODE_DUMP_SLEECTION[index] = { PurposeCode: event[0], Description: this.validator.PURPOSE_CODE_FILTER_DATA[index]?.Value_greater_25000_equv[0] };
    this.validator.SELECTED_PURPOSE_CODE_INDEX[index] = true;
    this.validator.PURPOSE_CODE_FILTER_DATA?.forEach((element:any, i:any) => {
      if (index == i) {
        element['isActive'] = true;
      }
    });
  }

  PURPOSE_ValueAdd(id: any, field: any) {
    this.PUPOSE_CODE_FEILD_FORM['id'] = id;
    this.PUPOSE_CODE_FEILD_FORM['field'] = field;
  }

  ALL_DATA_PURPOSE_CODE: any = '';
  PURPOSEDoneButton() {
    let temp2: any = [];
    this.validator.SELECTED_PURPOSE_CODE_DUMP_SLEECTION.forEach((element:any) => {
      temp2.push(element?.PurposeCode);
    });
    console.log(temp2, "PURPOSEDoneButton")
    this.ALL_DATA_PURPOSE_CODE = temp2.join(',');
    this.setValue(this.ALL_DATA_PURPOSE_CODE, this.PUPOSE_CODE_FEILD_FORM?.field);
  }

  IMAGE_UPLOAD_LIST: any = [];
  onUploadChanges(event: any, autofill: any) {
    if (event.target.files.length > 0) {
      event.target.files.forEach((element:any) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.IMAGE_UPLOAD_LIST.push({
            name: element?.name,
            buffer: fileReader.result
          })
        }
        fileReader.readAsDataURL(element);
      });
      this.validator.dynamicFormGroup[this.id]?.controls[autofill?.key]?.setValue(this.IMAGE_UPLOAD_LIST);
    }
  }
  removeImage(index: any, autofill: any) {
    this.IMAGE_UPLOAD_LIST.splice(index, 1);
    this.validator.dynamicFormGroup[this.id]?.controls[autofill?.key]?.setValue(this.IMAGE_UPLOAD_LIST);
  }

  HideShowInput(event: any, item: any) {
    if (item != undefined) {
      if (item[event] != undefined) {
        item[event]?.forEach((element:any) => {
          const index = this.validator.FIELDS_DATA[this.id]?.findIndex((val:any) => val?.fieldName?.includes(element));
          if (index != -1 && item[event] != undefined) {
            this.validator.FIELDS_DATA[this.id][index]['disabled'] = true;
            this.validator.dynamicFormGroup[this.id]?.controls[element]?.disable();
          } else {
            this.validator.FIELDS_DATA[this.id][index]['disabled'] = false;
            this.validator.dynamicFormGroup[this.id]?.controls[element]?.enable();
          }
        });
      } else {
        for (const key in item) {
          const element = item[key];
          element.forEach((fieldNameelement:any) => {
            const index = this.validator.FIELDS_DATA[this.id]?.findIndex((val:any) => val?.fieldName?.includes(fieldNameelement));
            if (index != -1 && item[event] != undefined) {
              this.validator.FIELDS_DATA[this.id][index]['disabled'] = true;
              this.validator.dynamicFormGroup[this.id]?.controls[fieldNameelement]?.disable();
            } else {
              this.validator.FIELDS_DATA[this.id][index]['disabled'] = false;
              this.validator.dynamicFormGroup[this.id]?.controls[fieldNameelement]?.enable();
            }
          });
        }
      }
    }
  }

  HideInputCheckBox(bool: any, item: any) {
    if (item != undefined) {
      item.forEach((element:any) => {
        const index = this.validator.FIELDS_DATA[this.id]?.findIndex((val:any) => val?.fieldName?.includes(element?.name));
        if (index != -1) {
          if (element?.status == true) {
            this.validator.FIELDS_DATA[this.id][index]['disabled'] = false;
            this.validator.dynamicFormGroup[this.id]?.controls[element?.name]?.enable();
          } else {
            this.validator.FIELDS_DATA[this.id][index]['disabled'] = true;
            this.validator.dynamicFormGroup[this.id]?.controls[element?.name]?.disable();
          }
        }
      });
    }
  }

  ShowInputCheckBox(bool: any, item: any) {
    if (item != undefined) {
      item.forEach((element:any) => {
        const index = this.validator.FIELDS_DATA[this.id]?.findIndex((val:any) => val?.fieldName?.includes(element?.name));
        if (index != -1) {
          if (element?.status == true) {
            this.validator.FIELDS_DATA[this.id][index]['disabled'] = false;
            this.validator.dynamicFormGroup[this.id]?.controls[element?.name]?.enable();
          } else {
            this.validator.FIELDS_DATA[this.id][index]['disabled'] = true;
            this.validator.dynamicFormGroup[this.id]?.controls[element?.name]?.disable();
          }
        }
      });
    }
  }

  onLabelNameChange(event: any, item: any) {
    if (item != undefined) {
      console.log(item, item[event], event, "onLabelNameChange if")
      if (item[event] != undefined) {
        for (const key in item[event]) {
          const element = item[event][key];
          const index = this.validator.FIELDS_DATA[this.id]?.findIndex((val:any) => val?.fieldName?.includes(key));
          if (index != -1) {
            if (element['type'] = "formGroup") {
              this.validator.FIELDS_DATA[this.id][index]["NewformArray"]?.forEach((NewformArrayelement:any) => {
                let ObjectKEYS: any = Object.keys(NewformArrayelement);
                const formGroupindex = ObjectKEYS?.findIndex((val:any) => val.includes(element?.name));
                if (formGroupindex != -1) {
                  NewformArrayelement[element?.name]["label"] = element?.labelChange
                }
              });
            }
          }
        }
      } else {
        for (const key in item["default"]) {
          const element = item["default"][key];
          const index = this.validator.FIELDS_DATA[this.id]?.findIndex((val:any) => val?.fieldName?.includes(key));
          if (index != -1) {
            if (element['type'] = "formGroup") {
              this.validator.FIELDS_DATA[this.id][index]["NewformArray"]?.forEach((NewformArrayelement:any) => {
                let ObjectKEYS: any = Object.keys(NewformArrayelement);
                const formGroupindex = ObjectKEYS?.findIndex((val:any) => val.includes(element?.name));
                if (formGroupindex != -1) {
                  NewformArrayelement[element?.name]["label"] = element?.labelChange
                }
              });
            }
          }
        }
      }
    }
  }

  AutoFillCurrency(value: any, autofillitem: any) {
    if (autofillitem != undefined && autofillitem != null && autofillitem != '') {
      if (autofillitem?.type == "formGroup") {
        this.validator.dynamicFormGroup[this.id]?.controls[autofillitem?.CONTROLS_NAME]?.controls?.forEach((element:any) => {
          element?.controls[autofillitem?.SetInputName]?.setValue(value?.type);
        });
      } else {
        this.validator.dynamicFormGroup[this.id]?.controls[autofillitem?.CONTROLS_NAME]?.controls?.setValue(value?.type);
      }
    }
  }

  onSHIPPING_BILL_EVENT(value: any) {
    this.SHIPPING_BILL_EVENT.emit(value);
  }

  onBL_COPY_EVENT(value: any) {
    this.BL_COPY_EVENT.emit(value);
  }

  CommericalListCheckBoxList: any = [];
  onCommericalListCheckBox(event:any, fieldName:any, index:any, item: any) {
    if (event?.checked == true) {
      this.CommericalListCheckBoxList.push(item);
    } else {
      this.CommericalListCheckBoxList.splice(index, 1);
    }
    this.validator.dynamicFormGroup[this.id].controls[fieldName].setValue(this.CommericalListCheckBoxList);
    console.log(event, item, this.CommericalListCheckBoxList, "CommericalListCheckBox")
  }

  onBankCheckBox(event:any, fieldName:any, item: any, ItemChecked:any) {
    this.validator.CHECK_BOX_BANK_LIST.forEach((element:any) => {
      element['checked'] = false;
    });
    if (event?.checked == true) {
      ItemChecked['checked'] = true;
    } else {
      ItemChecked['checked'] = false;
    }
    this.BankEvent.emit(item);
    this.validator.dynamicFormGroup[this.id].controls[fieldName].setValue(item);
    console.log(event, item, this.CommericalListCheckBoxList, "CommericalListCheckBox")
  }

  onChargerBankCheckBox(event:any, fieldName:any, item: any, ItemChecked:any) {
    this.validator.CHECK_BOX_BANK_LIST_CHARGES.forEach((element:any) => {
      element['checked'] = false;
    });
    if (event?.checked == true) {
      ItemChecked['checked'] = true;
    } else {
      ItemChecked['checked'] = false;
    }
    this.BankEvent.emit(item);
    this.validator.dynamicFormGroup[this.id].controls[fieldName].setValue(item);
    console.log(event, item, this.CommericalListCheckBoxList, "CommericalListCheckBox")
  }

  onRemitterCheckBox(event:any, fieldName:any, item: any, ItemChecked:any) {
    this.validator.CHECK_BOX_REMITTER_LIST.forEach((element:any) => {
      element['checked'] = false;
    });
    if (event?.checked == true) {
      ItemChecked['checked'] = true;
    } else {
      ItemChecked['checked'] = false;
    }
    this.validator.dynamicFormGroup[this.id].controls[fieldName].setValue(item);
    console.log(event, item, "onRemitterCheckBox")
  }

  BANK_CHECKBOX(value: any, CHECK_BOX_BANK_LIST_CHARGES:any) {
    console.log(value, this.validator?.bankDetail[value?.BankUniqueId], this.validator?.bankDetail, CHECK_BOX_BANK_LIST_CHARGES, "BANK_CHECKBOX")
    this.validator.CHECK_BOX_BANK_LIST = this.validator?.bankDetail[value?.BankUniqueId];
    this.validator.CHECK_BOX_BANK_LIST_CHARGES = []
    if (CHECK_BOX_BANK_LIST_CHARGES == true) {
      this.validator.CHECK_BOX_BANK_LIST_CHARGES = this.validator?.ToCreditAccountdata[value?.BankUniqueId];
    }
    this.validator.CHECK_BOX_BANK_LIST?.forEach((element:any) => {
      element['checked'] = false;
    });
    this.validator.CHECK_BOX_BANK_LIST_CHARGES?.forEach((element:any) => {
      element['checked'] = false;
    });
  }

  REMITTER_CHECKBOX(value: any) {
    console.log(value, this.validator?.REMITTER_LIST[value?.Remitter_Name], this.validator?.REMITTER_LIST, "BANK_CHECKBOX")
    this.validator.CHECK_BOX_REMITTER_LIST = this.validator?.REMITTER_LIST[value?.Remitter_Name];
    this.validator.CHECK_BOX_REMITTER_LIST.forEach((element:any) => {
      element['checked'] = false;
    });
  }

  YesNoFunction(value: any, name: any, callback:any) {
    this.setValue(value, name)
    this.YesNoCheckBoxEvent.emit(value);
    if (callback != null && callback != undefined) {
      callback(value);
    }
  }

  AddAdditionalDocuments(form:any, name:any, index:any, fromitems:any) {
    console.log(form, name, index, fromitems, "AddAdditionalDocuments")
    if (fromitems?.items != undefined && fromitems?.items?.length != 0) {
      fromitems?.items.push(fromitems?.items[fromitems?.items?.length - 1] + 1)
      form?.value[name]?.push()
    }
  }

  removeAdditionalDocuments(form:any, name:any, index:any, fromitems:any) {
    console.log(form, name, index, fromitems, "removeAdditionalDocuments")
    if (fromitems?.items != undefined && fromitems?.items?.length != 0) {
      fromitems?.items?.splice(index, 1);
      form?.value[name]?.splice(index, 1);
    }
  }

  PushValueAdditionalDocuments(args:any, form:any, name:any, index:any, fromitems:any) {
    console.log(args, form, name, index, fromitems, "PushValueeAdditionalDocuments")
    if (fromitems?.items != undefined && fromitems?.items?.length != 0) {
      form.value[name][index] = args[1].publicUrl
    }
  }
  AdditionalDocumentsUrl: any = ''
  ViewAdditionalDocuments(doc: any) {
    this.AdditionalDocumentsUrl = ''
    setTimeout(() => {
      this.AdditionalDocumentsUrl = doc;
    }, 200);
  }
  UploadedViewPdfUrl: any = ''
  UploadedViewPdf(pdf: any) {
    this.UploadedViewPdfUrl = '';
    setTimeout(() => {
      this.UploadedViewPdfUrl = pdf;
    }, 200);
  }

  onhrefLink(value:any){
     this.router.navigate([value]);
  }
}