import { ElementRef, Injectable, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceValidatorService implements OnInit {
  dynamicFormGroup: any = [];
  model:any = {};
  SHIPPING_BILL_LIST: any = [];
  BL_COPY_LIST: any = [];
  COMMERICAL_NO: any = [];
  ORM_BY_PARTY_NAME: any = [];
  ORM_SELECTION_DATA: any = [];
  BOE_LIST: any = [];
  CURRENCY_LIST: any = [];
  BUYER_DETAILS: any = [];
  BUYER_ADDRESS_DETAILS: any = [];
  BENEFICIARY_DETAILS: any = [];
  BENEFICIARY_ADDRESS_DETAILS: any = [];
  INWARD_REMITTANCE_NAME_LIST: any = [];
  NEW_INWARD_REMITTANCE_NAME_LIST: any = [];
  ConsigneeNameList: any = [];
  PIPO_DATA: any = [];
  pipourl1: any = '';
  pipoArr: any = [];
  BUYER_LIST: any = [];
  CommercialNumber: any = [];
  COMMERCIAL_LIST: any = [];
  commerciallist: any = [];
  SHIPPING_BUNDEL: any = [];
  SHIPPING_BILL_MASTER_DATA: any = [];
  SUBMIT_ERROR: boolean = false;
  origin: any = [];
  commodity: any = [];
  location: any = [];
  bankDetail: any = [];
  bankDetail2: any = [];
  Id: any = '';
  BANK_NAME_LIST_GLOABL: any = [];
  FIELDS_DATA: any = [];
  LOGIN_TOEKN: any = '';
  userData: any = [];
  BUYER_NOT_EXITS: boolean = false;
  BENEFICIARY_NOT_EXITS: boolean = false;
  SELECTED_PIPO: any = [];
  SELECTED_PIPO_ID: any = [];
  ToChargesAccountdata: any = [];
  ToCreditAccountdata: any = [];
  BANK_LIST_DROPDOWN: any = [];
  CommericalNo: ElementRef | any;
  BUYER_DETAILS_MASTER: any = [];
  COMPANY_INFO: any = [];
  CHECK_BOX_BANK_LIST: any = [];
  CHECK_BOX_BANK_LIST_CHARGES: any = [];
  CHECK_BOX_REMITTER_LIST: any = [];
  REMITTER_LIST: any = []
  PIPO_LIST: any = [];
  PAYMENTS_TEMRS: any = [];
  PURPOSE_CODE_FILTER_DATA: any = [];
  PURPOSE_CODE_LIST_DATA: any = [];
  A2_JSON_DATA: any = []
  sumTotalAmount: any = 0;
  SELECTED_PURPOSE_CODE_DATA: any = [];
  SELECTED_PURPOSE_CODE_INDEX: any = [];
  SELECTED_PURPOSE_CODE_DUMP_SLEECTION: any = [];
  UPLOAD_STATUS: boolean = false;
  USER_DATA: any = [];
  PIPO_TRANSCTION_LIST: any = [];
  DROP_DOWN_DATA: any = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  toWords(s:any) {
    var th = ['', 'thousand', 'million', 'billion', 'trillion'];
    var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    var x = s.indexOf('.');
    if (x == -1)
        x = s.length;
    if (x > 15)
        return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] != 0) { // 0235
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'hundred ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk)
                str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }

    if (x != s.length) {
        var y = s.length;
        str += 'point ';
        for (let i = x + 1; i < y; i++)
            str += dg[n[i]] + ' ';
    }
    return str.replace(/\s+/g, ' ');
}

  filterData(data: any) {
    this.PURPOSE_CODE_FILTER_DATA = this.A2_JSON_DATA.filter((item: any) => item?.RBI_Purpose_Code.includes(data));
    console.log(data, this.PURPOSE_CODE_FILTER_DATA, this.A2_JSON_DATA, 'asdhasdkasdsads')
    if (this.PURPOSE_CODE_FILTER_DATA.length == 0 || data == '') {
      this.PURPOSE_CODE_FILTER_DATA = this.A2_JSON_DATA;
    }
  }

  text_array(text: any) {
    let split_text: any = text?.indexOf("\n") != -1 ? text?.split('\n') : [text];
    return split_text;
  }

  async buildForm(model: any, id: any) {
    return new Promise(async(resolve, reject) => {
      const formGroupFields = await this.getFormControlsFields(model, id);
      var VALIDATOR_LIST:any={validators:[]}
      formGroupFields?.fields?.forEach(element => {
        if (element?.validators!=undefined) {
          VALIDATOR_LIST?.validators?.push(element?.validators)
        }
      });
      this.dynamicFormGroup[id] = await new FormGroup(formGroupFields?.formGroupFields,VALIDATOR_LIST);
      this.FIELDS_DATA[id] = formGroupFields?.fields;
      console.log(this.dynamicFormGroup, formGroupFields, model, 'dynamicFormGroup');
      await this.dynamicFormGroup;
      await resolve(this.dynamicFormGroup);
      await this.FIELDS_DATA[id]?.forEach((element:any) => {
        if (element?.type === "yesnocheckbox") {
          element?.HideShowInput?.forEach((HideShowInputElement:any) => {
            const index = this.FIELDS_DATA[id]?.findIndex((val:any) => val?.fieldName?.includes(HideShowInputElement?.name));
            if (index != -1) {
              if (HideShowInputElement?.status == true) {
                this.FIELDS_DATA[id][index]['disabled'] = false;
                this.dynamicFormGroup[id]?.controls[HideShowInputElement?.name]?.enable();
              } else {
                this.FIELDS_DATA[id][index]['disabled'] = true;
                this.dynamicFormGroup[id]?.controls[HideShowInputElement?.name]?.disable();
              }
            }
          });
        }
      });
    })
  }


  setBankList(data: any) {
    this.BANK_NAME_LIST_GLOABL = [];
    setTimeout(() => {
      this.BANK_NAME_LIST_GLOABL = data;
    }, 200);
  }

  async getFormControlsFields(model: any, formid: any) {
    const formGroupFields:any = {};
    let fields: any = [];
    for (let field of Object.keys(model)) {
      const fieldProps: any = model[field];
      if (fieldProps?.type == "formArray") {
        var temp: any = [];
        var tempFormGroup: any = [];
        let count: number = 0;
        fieldProps?.formGroup.forEach((element:any) => {
          for (let field2 of Object.keys(element)) {
            temp.push({ ...element[field2], fieldName: field2, index: count });
            tempFormGroup.push(new FormGroup({
              [field2]: new FormControl({ value: element[field2]?.value || "", disabled: element[field2]?.disabled != undefined ? true : false },
                this.setRequired(element[field2]?.minLength, element[field2]?.maxLength,
                  element[field2]?.rules, formid, fieldProps)[element[field2]?.typeOf != undefined ? element[field2]?.typeOf : element[field2]?.type])
            }));
            count++;
          }
        });
        fieldProps['NewformGroup'] = temp;
        fieldProps['RemoveListIndex'] = [{ START_INDEX: -1, LAST_INDEX: -1 }];
        if (fieldProps?.AutoFill == true && fieldProps?.AutoFill != undefined) {
          formGroupFields[field] = await new FormArray(tempFormGroup, hasDuplicateFormArray(fieldProps?.EqualList));
          fieldProps['ExtraValue'] = '';
          fieldProps['fieldName_More'] = field + '_Extra';
          fields.push({ ...fieldProps, fieldName: field });
        } else {
          formGroupFields[field] = await new FormArray(tempFormGroup);
          fieldProps['ExtraValue'] = '';
          fieldProps['fieldName_More'] = field + '_Extra';
          fields.push({ ...fieldProps, fieldName: field });
        }
      } else if (fieldProps?.type == "OptionMultiCheckBox" && fieldProps?.option != undefined) {
        var temp: any = [];
        var tempFormGroup: any = [];
        var temp1: any = [];
        var ORDER_KEYS: any = [];

        fieldProps?.option?.forEach(async (element:any) => {
          let optiontemp: any = {};
          let OptiontempFormGroup: any = {};
          element?.forEach((optionelement:any) => {
            optiontemp[optionelement?.name] = ({ ...optionelement, fieldName: optionelement?.name });
            OptiontempFormGroup[optionelement?.name] = new FormControl({ value: optionelement?.value || "", disabled: optionelement?.disabled != undefined ? true : false },
              this.setRequired(optionelement?.minLength, optionelement?.maxLength, optionelement?.rules, formid, fieldProps)[optionelement?.typeOf != undefined ? optionelement?.typeOf : optionelement?.type])
          });
          await temp.push(optiontemp);
          await tempFormGroup.push(new FormGroup(OptiontempFormGroup, null));
        });
        fieldProps?.option1?.forEach(async (element:any) => {
          let optiontemp: any = {};
          let OptiontempFormGroup: any = {};
          element?.forEach((optionelement:any) => {
            optiontemp[optionelement?.name] = ({ ...optionelement, fieldName: optionelement?.name });
            OptiontempFormGroup[optionelement?.name] = new FormControl({ value: optionelement?.value || "", disabled: optionelement?.disabled != undefined ? true : false },
              this.setRequired(optionelement?.minLength,
                optionelement?.maxLength, optionelement?.rules, formid, fieldProps)[optionelement?.typeOf != undefined ? optionelement?.typeOf : optionelement?.type])
          });
          await temp1.push(optiontemp);
          await tempFormGroup.push(new FormGroup(OptiontempFormGroup, null));
        });
        fieldProps['NewOption'] = temp;
        fieldProps['NewOption1'] = temp1;
        fieldProps['ExtraValue'] = '';
        fieldProps['fieldName_More'] = field + '_Extra';
        formGroupFields[field] = await new FormArray(tempFormGroup)
        fields.push({ ...fieldProps, fieldName: field });
      } else if (fieldProps?.type == "formGroup" && fieldProps?.formArray != undefined) {
        var temp: any = [];
        var temp1: any = [];
        var tempFormGroup: any = [];
        var ORDER_KEYS: any = [];
        var ORDER_KEYS2: any = [];
        fieldProps?.formArray?.forEach(async (element:any, index:any) => {
          let optiontemp: any = {};
          let OptiontempFormGroup: any = {};
          ORDER_KEYS[index] = [];
          let optiontemp1: any = {};
          let OptiontempFormGroup1: any = {};

          element?.forEach(async (optionelement:any) => {
            if (optionelement?.type == "BankAdd") {
              var tempFormGroup1: any = [];
              optionelement?.ChildformArray?.forEach(async (ChildformArrayelement:any, k:any) => {
                ORDER_KEYS2[k] = [];
                ChildformArrayelement?.forEach((ChildformArrayOptionElement:any) => {
                  ORDER_KEYS2[k].push(ChildformArrayOptionElement?.name?.toString());
                  optiontemp1[ChildformArrayOptionElement?.name?.toString()] = ({ ...ChildformArrayOptionElement, fieldName: ChildformArrayOptionElement?.name });
                  OptiontempFormGroup1[ChildformArrayOptionElement?.name?.toString()] = new FormControl({ value: ChildformArrayOptionElement?.value || "", disabled: ChildformArrayOptionElement?.disabled != undefined ? true : false },
                    this.setRequired(ChildformArrayOptionElement?.minLength,
                      ChildformArrayOptionElement?.maxLength, ChildformArrayOptionElement?.rules, formid, ChildformArrayOptionElement)[ChildformArrayOptionElement?.typeOf != undefined ? ChildformArrayOptionElement?.typeOf : ChildformArrayOptionElement?.type])
                });
                await temp1.push(optiontemp1);
                await tempFormGroup1.push(new FormGroup(OptiontempFormGroup1, null));
              });
            }
            if (optionelement?.ChildformArrayBool == true) {
              ORDER_KEYS[index].push(optionelement?.name?.toString());
              optionelement['NewformArray'] = temp1;
              optionelement['ExtraValue'] = '';
              optionelement['OrderKey'] = ORDER_KEYS2;
              optionelement['fieldName_More'] = field + '_Extra';
              optiontemp[optionelement?.name?.toString()] = ({ ...optionelement, fieldName: optionelement?.name });
              OptiontempFormGroup[optionelement?.name?.toString()] = new FormArray(tempFormGroup1)
            } else {
              ORDER_KEYS[index].push(optionelement?.name?.toString());
              optiontemp[optionelement?.name?.toString()] = ({ ...optionelement, fieldName: optionelement?.name });
              OptiontempFormGroup[optionelement?.name?.toString()] = new FormControl({ value: optionelement?.value || "", disabled: optionelement?.disabled != undefined ? true : false },
                this.setRequired(optionelement?.minLength,
                  optionelement?.maxLength, optionelement?.rules, formid, optionelement)[optionelement?.typeOf != undefined ? optionelement?.typeOf : optionelement?.type])
            }
          });

          await temp.push(optiontemp);
          await tempFormGroup.push(new FormGroup(OptiontempFormGroup, null));
        });
        fieldProps['NewformArray'] = temp;
        fieldProps['ExtraValue'] = '';
        fieldProps['OrderKey'] = ORDER_KEYS;
        fieldProps['fieldName_More'] = field + '_Extra';
        formGroupFields[field] = await new FormArray(tempFormGroup);
        fields.push({ ...fieldProps, fieldName: field });
        console.log('formGroup', fields)
      } else {
        formGroupFields[field] = new FormControl({ value: fieldProps.value, disabled: fieldProps?.disabled != undefined ? true : false },
          this.setRequired(fieldProps?.minLength, fieldProps?.maxLength, fieldProps?.rules, formid, fieldProps)[fieldProps?.typeOf != undefined ? fieldProps?.typeOf : fieldProps?.type]);
        fieldProps['ExtraValue'] = '';
        fieldProps['fieldName_More'] = field + '_Extra';
        fields.push({ ...fieldProps, fieldName: field });
      }
    }
    console.log(fields, formGroupFields, 'hghjgjhghjgjh')
    return { formGroupFields: formGroupFields, fields: fields };
  }

  ControlSetValue(id: any, key: any, value: any) {
    console.log(value, 'asdasdasdasds')
    this.FIELDS_DATA[id]?.[key]?.setValue(value);
  }

  setValueFromArray(id: any, form: any, fieldName: any, OptionfieldIndex: any, FormOptionfieldName: any, value: any, callback: any = undefined, field: any = undefined) {
    const myForm: any = form?.controls[fieldName] as FormGroup;
    let currentVal = value;
    myForm.value[OptionfieldIndex][FormOptionfieldName] = currentVal;
    myForm?.controls[OptionfieldIndex]?.controls[FormOptionfieldName]?.setValue(currentVal);
    myForm['touched'] = true;
    myForm['status'] = 'VALID';
    this.dynamicFormGroup[id].get(fieldName).clearValidators();
    this.dynamicFormGroup[id].get(fieldName).updateValueAndValidity();
    console.log(myForm, value, "myForm")
    if (callback != undefined && callback != null) {
      callback({ id: id, form: form, fieldName: fieldName, OptionfieldIndex: OptionfieldIndex, FormOptionfieldName: FormOptionfieldName, value: value, dynamicFormGroup: this.dynamicFormGroup[id], field: field });
    }
  }

  setValueFrom(id: any, form: any, fieldName: any, value: any, callback: any = undefined, field: any = undefined) {
    const myForm: any = form?.controls[fieldName] as FormGroup;
    let currentVal = value;
    myForm?.setValue(currentVal);
    myForm['touched'] = true;
    myForm['status'] = 'VALID';
    this.dynamicFormGroup[id].get(fieldName).clearValidators();
    this.dynamicFormGroup[id].get(fieldName).updateValueAndValidity();
    console.log(myForm, value, "myForm")
    if (callback != undefined && callback != null) {
      callback({ id: id, form: form, fieldName: fieldName, value: value, dynamicFormGroup: this.dynamicFormGroup[id], field: field });
    }
  }

  setValueFromChildArray(id: any, form: any, ParentfieldName: any, FormArrayfieldName: any, OptionfieldIndex: any,
    ChildOptionfieldName: any, ChildOptionfieldIndex: any, FormOptionfieldName: any, value: any, callback: any = undefined, field: any = undefined) {
    const myForm: any = form?.controls[ParentfieldName] as FormGroup;
    let currentVal = value;
    myForm.value[OptionfieldIndex][FormOptionfieldName][ChildOptionfieldIndex][ChildOptionfieldName] = currentVal;
    myForm?.controls[OptionfieldIndex]?.controls[FormOptionfieldName]?.setValue(currentVal);
    myForm['touched'] = true;
    myForm['status'] = 'VALID';
    this.dynamicFormGroup[id].get(FormArrayfieldName).clearValidators();
    this.dynamicFormGroup[id].get(FormArrayfieldName).updateValueAndValidity();
    console.log(myForm, value, "setValueFromChildArray")
    if (callback != undefined && callback != null) {
      callback({ id: id, form: form, fieldName: FormArrayfieldName, OptionfieldIndex: OptionfieldIndex, FormOptionfieldName: FormOptionfieldName, value: value, dynamicFormGroup: this.dynamicFormGroup[id], field: field });
    }
  }

  ConfirmedValidator(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl:any = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  setRequired(minLength: any, maxLength: any, rule: any, formid: any, field: any):any {
    return {
      text: rule?.required == true ?
        [Validators.required, minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50)] :
        [minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50)],
      textarea: rule?.required == true ?
        [Validators.required, minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50)] :
        [minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50)],
      date: rule?.required == true ? [Validators.required, minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50)] :
        [minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50)],
      Address: rule?.required == true ? [Validators.required, minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50)] :
        [minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(200)],
      number: rule?.required == true ? [Validators.required, minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50)] :
        [minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50)],
        MPIN: rule?.required == true && field?.InputValidators!=undefined?field?.InputValidators:[] ,

      TextValiadtion: rule?.required == true ?
        [Validators.required, minLength != undefined ?
          Validators.minLength(minLength) :
          Validators.minLength(0), maxLength != undefined ?
          Validators.maxLength(maxLength) : Validators.maxLength(50), hasAmountLessThanForm(field?.EqualName, field?.errormsg)] :
        [minLength != undefined ? Validators.minLength(minLength) :
          Validators.minLength(0), maxLength != undefined ?
          Validators.maxLength(maxLength) : Validators.maxLength(50),
        hasAmountLessThanForm(field?.EqualName, field?.errormsg)],

      TextGreaterValiadtion: rule?.required == true ?
        [Validators.required, minLength != undefined ?
          Validators.minLength(minLength) :
          Validators.minLength(0), maxLength != undefined ?
          Validators.maxLength(maxLength) : Validators.maxLength(50), hasAmountGreaterThanForm(field?.EqualName, field?.errormsg)] :
        [minLength != undefined ? Validators.minLength(minLength) :
          Validators.minLength(0), maxLength != undefined ?
          Validators.maxLength(maxLength) : Validators.maxLength(50),
        hasAmountGreaterThanForm(field?.EqualName, field?.errormsg)],

      buyer: rule?.required == true ? [Validators.required] : [],
      Newbuyer: rule?.required == true ? [Validators.required] : [],
      ReUpload: rule?.required == true ? [Validators.required] : [],
      DropDown: rule?.required == true ? [Validators.required] : [],
      button: rule?.required == true ? [Validators.required] : [],
      checkbox: rule?.required == true ? [Validators.required] : [],
      PURPOSE_CODE: rule?.required == true ? [Validators.required] : [],
      CheckboxMultiple: rule?.required == true ? [Validators.required] : [],
      SelectOption: rule?.required == true ? [Validators.required] : [],
      BankAdd: rule?.required == true ? [Validators.required] : [],
      RemitterCheckBox: rule?.required == true ? [Validators.required] : [],
      ShippingBill: rule?.required == true ? [Validators.required] : [],
      BankCheckBox: rule?.required == true ? [Validators.required] : [],
      ImagesList: rule?.required == true ? [Validators.required] : [],
      consignee: rule?.required == true ? [Validators.required] : [],
      commodity: rule?.required == true ? [Validators.required] : [],
      origin: rule?.required == true ? [Validators.required] : [],
      location: rule?.required == true ? [Validators.required] : [],
      PaymentType: rule?.required == true ? [Validators.required] : [],
      Bank: rule?.required == true ? [Validators.required] : [],
      BankList: rule?.required == true ? [Validators.required] : [],
      currency: rule?.required == true ? [Validators.required] : [],
      CommericalNo: rule?.required == true ? [Validators.required] : [],
      typedocument: rule?.required == true ? [Validators.required] : [],
      PaymentTermType: rule?.required == true ? [Validators.required] : [],
      undefined: rule?.required == true ? [Validators.required] : [],
      MatchedValue: rule?.required == true ? [Validators.required] : [],
      Underlying: rule?.required == true ? [Validators.required] : [],
      BuySell: rule?.required == true ? [Validators.required] : [],
      IncoTerm: rule?.required == true ? [Validators.required] : [],
      MultiCheckBox: rule?.required == true ? [Validators.required] : [],
      OptionMultiCheckBox: rule?.required == true ? [Validators.required] : [],
      RemitterName: rule?.required == true ? [Validators.required] : [],
      formGroup: rule?.required == true ? [Validators.required] : [],
      benne: rule?.required == true ? [Validators.required] : [],
      CommericalListCheckBox: rule?.required == true ? [Validators.required] : [],
      BLCopy: rule?.required == true ? [Validators.required] : [],
      yesnocheckbox: rule?.required == true ? [Validators.required] : [],
      ArrayList: rule?.required == true ? [Validators.required] : [],
      ArrayList_Object: rule?.required == true ? [Validators.required] : [],
      InputButton: rule?.required == true && field?.InputValidators!=undefined?field?.InputValidators:[] ,
      BOE: rule?.required == true ? [Validators.required] : [],
      ORM_SELECTION: rule?.required == true ? [Validators.required] : [],
      LABLE_CHECKBOX: rule?.required == true ? [Validators.required] : [],
      EmailButton: rule?.required == true ? [Validators.required] : [],
      NumberButton: rule?.required == true ? [Validators.required] : [],
      AdvanceInfo: [],
      NotRequired: [],
      CallbackButton: [],
      LabelShow: [],
      OnlyLabelShow: [],
      SB_DETAILS_SHOW: [],
      ALPHA_NUMERIC: rule?.required == true ? [Validators.required, minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(20), alphaNumericValidator] :
        [minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50), alphaNumericValidator],
      email: rule?.required == true ? [Validators.required, minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(100)] :
        [minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(100)],
      password: rule?.required == true ? [Validators.required, minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50)] :
        [minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50)],
      confirmPassword: rule?.required == true ? [Validators.required, minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50), hasDuplicateControl({ key: 'confirmPassword', equalkey: 'password' }, this.dynamicFormGroup, formid)] :
        [minLength != undefined ? Validators.minLength(minLength) : Validators.minLength(0), maxLength != undefined ? Validators.maxLength(maxLength) : Validators.maxLength(50), hasDuplicateControl({ key: 'confirmPassword', equalkey: 'password' }, this.dynamicFormGroup, formid)],
    }
  }

  removeDuplicates(data: any, key: any) {
    let newArray: any = [];
    let uniqueObject: any = {};
    for (let i in data) {
      let objTitle = data[i][key];
      uniqueObject[objTitle] = data[i];
    }
    for (let i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }
    return newArray;
  }

  max_length_validator(id: any, fieldName: any) {
    if ((this.dynamicFormGroup[id]?.controls[fieldName]?.value?.length > this.dynamicFormGroup[id]?.controls[fieldName]?.errors?.['maxlength']?.requiredLength)) {
      return false;
    }
    return true;
  }
  max_length_validatorFormArray(id: any, formGroupKey: any, index: any, fieldName: any) {
    if ((this.dynamicFormGroup[id]?.controls[formGroupKey]?.controls[index]?.controls[fieldName]?.value?.length > this.dynamicFormGroup[id]?.controls[formGroupKey]?.controls[index]?.controls[fieldName]?.errors?.['maxlength']?.requiredLength)) {
      return false;
    }
    return true;
  }

  counter = 0;
  buildNewFormArray(field:any, index:any, element: any, formid: any, GroupLabel: any, MAX_LIMIT: any): any {
    return new Promise(async (resolve, reject) => {
      this.counter = GroupLabel.length + 1;
      var temp: any = [];
      var tempFormGroup: any = [];
      let count: number = this.FIELDS_DATA[formid][index]['NewformGroup'].length;
      let count1: number = this.FIELDS_DATA[formid][index]['NewformGroup'].length;
      for (let field2 of Object.keys(element)) {
        temp.push({ ...element[field2], fieldName: field2, index: count });
        this.FIELDS_DATA[formid][index]['NewformGroup'].push({ ...element[field2], fieldName: field2, index: count });
        tempFormGroup.push(new FormGroup({
          [field2]: new FormControl({ value: element[field2]?.value || "", disabled: element[field2]?.disabled != undefined ? true : false },
            this.setRequired(element[field2]?.minLength, element[field2]?.maxLength, element[field2]?.rules, formid, field2)[element[field2]?.typeOf != undefined ? element[field2]?.typeOf : element[field2]?.type])
        }));
        count++;
      }
      await this.FIELDS_DATA[formid][index]['formGroup'].push({ ... this.FIELDS_DATA[formid][index]['formGroup'][0], fieldName: field });
      await this.FIELDS_DATA[formid][index]['RemoveListIndex'].push({ START_INDEX: count1, LAST_INDEX: count1 + MAX_LIMIT?.MAX_LIMIT });
      await GroupLabel.push(GroupLabel[0].replace('1', GroupLabel?.length + 1));
      await resolve(await tempFormGroup);
    });
  }

  async addNewFormArray(id: any, index: any, fieldName: any) {
    let optiontemp: any = {};
    let OptiontempFormGroup: any = {};
    let dumpformdata: any = this.FIELDS_DATA[id][index]?.NewformArray[this.FIELDS_DATA[id][index]?.NewformArray?.length - 1];
    for (const key in dumpformdata) {
      const fieldProps: any = dumpformdata[key];
      optiontemp[fieldProps?.name] = ({ ...fieldProps, fieldName: fieldProps?.name });
      OptiontempFormGroup[fieldProps?.name] = new FormControl({ value: "", disabled: fieldProps?.disabled != undefined ? true : false },
        this.setRequired(fieldProps?.minLength, fieldProps?.maxLength, fieldProps?.rules, id, fieldProps)[fieldProps?.typeOf != undefined ? fieldProps?.typeOf : fieldProps?.type])
    }
    this.dynamicFormGroup[id]?.controls[fieldName]?.controls?.push(new FormGroup(OptiontempFormGroup));
    this.dynamicFormGroup[id]?.controls[fieldName]?.value?.push(this.emptyvalue(this.dynamicFormGroup[id]?.controls[fieldName]?.value[this.dynamicFormGroup[id]?.controls[fieldName]?.value?.length - 1]));
    this.FIELDS_DATA[id][index]['NewformArray']?.push(optiontemp);
    this.FIELDS_DATA[id][index]['OrderKey']?.push(this.FIELDS_DATA[id][index]['OrderKey'][this.FIELDS_DATA[id][index]['OrderKey']?.length - 1]);
    await this.FIELDS_DATA[id][index]?.GroupLabel?.push(this.FIELDS_DATA[id][index]?.GroupLabel[0]?.replace('1', this.FIELDS_DATA[id][index]?.GroupLabel?.length + 1));
    console.log('New formGroup', this.FIELDS_DATA, this.dynamicFormGroup[id])
  }

  emptyvalue(data: any) {
    var temp: any = {};
    for (const key in data) {
      temp[key] = ''
    }
    return temp;
  }

  async removeNewFormArray(id: any, index: any, fieldName: any, OptionfieldIndex: any) {
    this.dynamicFormGroup[id]?.controls[fieldName]?.controls?.splice(OptionfieldIndex, 1);
    this.dynamicFormGroup[id]?.controls[fieldName]?.value?.splice(OptionfieldIndex, 1);
    this.FIELDS_DATA[id][index]['NewformArray']?.splice(OptionfieldIndex, 1);
    this.FIELDS_DATA[id][index]['NewformArray']?.forEach((element:any, index:any) => {
      this.FIELDS_DATA[id][index]?.GroupLabel?.push(this.FIELDS_DATA[id][index]?.GroupLabel[0]?.replace('1', (index + 1)));
    });
    console.log('New formGroup', this.FIELDS_DATA, this.dynamicFormGroup[id])
  }

  removeFormArray(formGroupKey:any, index:any, labelIndex: any, formid: any, MAX_LIMIT: any): any {
    return new Promise(async (resolve, reject) => {
      if (index != 0) {
        let indexstore: any = this.FIELDS_DATA[formid][index]['RemoveListIndex'][labelIndex];
        for (var i = indexstore?.LAST_INDEX; i-- > indexstore?.START_INDEX;) {
          this.dynamicFormGroup[formid]?.controls[formGroupKey]?.removeAt(i)
        }
        await this.FIELDS_DATA[formid][index]['formGroup']?.splice(labelIndex, 1);
        await this.FIELDS_DATA[formid][index]['GroupLabel']?.splice(labelIndex, 1)

        for (let i = indexstore?.LAST_INDEX - 1; i >= indexstore?.START_INDEX; i--) {
          this.FIELDS_DATA[formid][index]['NewformGroup']?.splice(i, 1);
        }

        for (let i = this.FIELDS_DATA[formid][index]['RemoveListIndex']?.length - 1; i >= labelIndex; i--) {
          this.FIELDS_DATA[formid][index]['RemoveListIndex']?.splice(i, 1);
        }

        if (indexstore?.START_INDEX != MAX_LIMIT?.MAX_LIMIT) {
          this.FIELDS_DATA[formid][index]['NewformGroup']?.forEach((element:any, index:any) => {
            element['index'] = index;
          });
          this.FIELDS_DATA[formid][index]['GroupLabel']?.forEach((element:any, i:any) => {
            let tempelement = this.FIELDS_DATA[formid][index]['GroupLabel'][0]?.replace('1', '');
            this.FIELDS_DATA[formid][index]['GroupLabel'][i] = tempelement + ' ' + (i + 1);
          });
          this.removeIndexUpdate(this.FIELDS_DATA[formid][index]['RemoveListIndex'], MAX_LIMIT?.MAX_LIMIT);
        }
      }
      await resolve('');
    });
  }

  removeIndexUpdate(data: any, MAX_LIMIT: any) {
    data?.forEach((element:any) => {
      for (const key in element) {
        if (element?.START_INDEX != MAX_LIMIT && element?.START_INDEX != -1) {
          element[key] = element[key] - MAX_LIMIT
        }
      }
    });
  }

  removeUpdateFormValue(data: any, MAX_LIMIT: any) {
    data?.forEach((element:any) => {
      for (const key in element) {
        if (element?.START_INDEX != MAX_LIMIT && element?.START_INDEX != -1) {
          element[key] = element[key] - MAX_LIMIT
        }
      }
    });
  }

  setInputVisibilty(formid: any, index: any, key:any, value: any) {
    this.FIELDS_DATA[formid][index][key] = value;
  }
}

export function hasDuplicateFormArray(data: any): ValidatorFn {
  return (formArray: FormArray | any): { [key: string]: any } | null | any => {
    if (formArray?.controls?.[data?.index]?.controls?.[data?.key]?.value != formArray?.controls?.[data?.equalindex]?.controls?.[data?.equalkey]?.value) {
      formArray?.controls?.[data?.equalindex]?.controls?.[data?.equalkey]?.setErrors({ matched: data?.errormsg })
      return null;
    } else {
      return null;
    }
  };
}

export function hasAmountLessThanFormArray(control: FormControl): ValidationErrors | null {
  console.log(control, "hasAmountLessThanFormArray")
  const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;
  const ALPHA_NUMERIC_VALIDATION_ERROR = { alphaNumericError: 'only alpha numeric values are allowed' }
  return ALPHA_NUMERIC_REGEX.test(control.value) ? null : ALPHA_NUMERIC_VALIDATION_ERROR;
}

export function hasAmountLessThanForm(equals: string, Message: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const equalsField: any = control.root.get(equals)
    if (equalsField) {
      if (parseFloat(control.value) <= parseFloat(equalsField?.value)) {
        return null;
      } else {
        return { matched: Message };
      }
    }
    return null;
  }
}

export function hasAmountGreaterThanForm(equals: string, Message: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const equalsField: any = control.root.get(equals)
    if (equalsField) {
      if (parseFloat(control.value) >= parseFloat(equalsField?.value)) {
        return null;
      } else {
        return { matched: Message };
      }
    }
    return null;
  }
}

export function hasAmountGreaterThanFormArray(control: FormControl): ValidationErrors | null {
  console.log(control, "hasAmountGreaterThanFormArray")
  const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;
  const ALPHA_NUMERIC_VALIDATION_ERROR = { alphaNumericError: 'only alpha numeric values are allowed' }
  return ALPHA_NUMERIC_REGEX.test(control.value) ? null : ALPHA_NUMERIC_VALIDATION_ERROR;
}

export function RemoveValidator(): ValidatorFn {
  return (formArray: FormArray | any): { [key: string]: any } | null | any => {
    console.log(formArray, 'formArray')
    return null
  };
}

export function hasDuplicateControl(data: any, forms: any, id: any): ValidationErrors {
  return (formArray: FormControl | any): { [key: string]: any } | null | any => {
    console.log(formArray, forms, 'formArray')
    if (forms[id] != undefined) {
      if (forms[id]?.controls[data?.key] != undefined && forms[id]?.controls[data?.equalkey] != undefined) {
        if (forms[id]?.controls[data?.key]?.value != forms[id]?.controls[data?.equalkey]?.value) {
          return { matched: 'Password and Confirm Password must be match.' };
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
}


export function alphaNumericValidator(control: FormControl): ValidationErrors | null {
  const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;
  const ALPHA_NUMERIC_VALIDATION_ERROR = { alphaNumericError: 'only alpha numeric values are allowed' }
  return ALPHA_NUMERIC_REGEX.test(control.value) ? null : ALPHA_NUMERIC_VALIDATION_ERROR;
}

export function alphaValidator(control: FormControl): ValidationErrors | null {
  const ALPHA_REGEX = /^[a-zA-Z_]*$/;
  const ALPHA_VALIDATION_ERROR = { alphaError: 'only alphabets values are allowed' }
  return ALPHA_REGEX.test(control.value) ? null : ALPHA_VALIDATION_ERROR;
}

export function EmailValidator(control: FormControl): ValidationErrors | null {
  const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/;
  const EMAIL_VALIDATION_ERROR = { emailError: 'Please insert/enter a valid email address.' }
  return EMAIL_REGEX.test(control.value) ? null : EMAIL_VALIDATION_ERROR;
}

export function PasswordValidator(control: FormControl): ValidationErrors | null {
  const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/;
  const EMAIL_VALIDATION_ERROR = { emailError: 'Please insert/enter a valid email address.' }
  return EMAIL_REGEX.test(control.value) ? null : EMAIL_VALIDATION_ERROR;
}

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl:any = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: 'Password and Confirm Password must be match.' });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

// PasswordStrengthValidator
export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {
  let value: string = control.value || '';
  if (!value) {
    return null
  }
  let upperCaseCharacters = /[A-Z]+/g
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: `text has to contine Upper case characters,current value ${value}` };
  }
  let lowerCaseCharacters = /[a-z]+/g
  if (lowerCaseCharacters.test(value) === false) {
    return { passwordStrength: `text has to contine lower case characters,current value ${value}` };
  }
  let numberCharacters = /[0-9]+/g
  if (numberCharacters.test(value) === false) {
    return { passwordStrength: `text has to contine number characters,current value ${value}` };
  }
  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  if (specialCharacters.test(value) === false) {
    return { passwordStrength: `text has to contine special character,current value ${value}` };
  }
  return null;
}