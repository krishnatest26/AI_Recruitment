import { IForm } from "../interface/form.interface";

export const payrollSettingBaseDataFormConfig: IForm = {
  addFormTitle: '',
  editFormTitle: '',
  saveBtnTitle: 'Save Changes',
  cancelBtnTitle: '',
  modalSize: '',
  formControls: [
    {
      "name": "compaddR1",
      "label": "Address Line 1",
      "value": "",
      "placeholder": "Address Line 1",
      "class": "pconfig col-md-6",
      "type": "text",
      "dataType": "string"
    }
  ],
};
