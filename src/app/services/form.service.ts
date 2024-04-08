import { Injectable } from '@angular/core';
import { IForm, IValidator } from '../interface/form.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  buildColumnArray(formConfig: IForm): any[] {
    let columnArray: any[] = [];
    formConfig.formControls.forEach(control => {
      let column = {
        fieldName: control.name,
        displayName: control.label,
        dataType: control.dataType
      };
      columnArray.push(column);
    });
    return columnArray;
  }

}
