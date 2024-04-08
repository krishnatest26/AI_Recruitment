import { IForm } from "../interface/form.interface";

export const controlCalendarsFormConfig: IForm = {
    addFormTitle: 'Add Control Calendar',
    editFormTitle: 'Edit Control Calendar',
    saveBtnTitle: 'Save Changes',
    cancelBtnTitle: 'Cancel',
    modalSize: 'lg',
    formControls: [
        {
            "name": "calno",
            "label": "Payroll Calendar Name",
            "value": "",
            "placeholder": "Payroll Calendar Name",
            "class": "col-md-12 pcname",
            "type": "text",
            "dataType" : "string"
        },
    ],
};
