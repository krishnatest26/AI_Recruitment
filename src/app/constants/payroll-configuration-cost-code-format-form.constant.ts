import { IForm } from "../interface/form.interface";

export const costCodeformatFormConfig: IForm = {
  addFormTitle: 'Add Cost Code Format',
  editFormTitle: 'Edit Cost Code Format',
  saveBtnTitle: 'Save Changes',
  cancelBtnTitle: 'Cancel',
  modalSize: 'sm',

  formControls: [
    {
      "name": "costcodeanind",
      "label": "Format Option",
      "value": "",
      "placeholder": "",
      "class": "pconfig col-md-6",
      "type": "text",
      "dataType": "string"
    }
  ],

}
