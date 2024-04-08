import { IForm } from "../interface/form.interface";

export const charityDetailsFormConfig: IForm = {
    addFormTitle: 'Add Charity Details',
    editFormTitle: 'Edit Charity Details',
    saveBtnTitle: 'Save Changes',
    cancelBtnTitle: 'Cancel',
    modalSize: 'sm',
    formControls: [
        {
            "name": "compagencyname",
            "label": "Agency Name",
            "value": "",
            "placeholder": "Agency Name",
            "class": "col-md-12",
            "type": "text",
            "dataType" : "string"
        },

        {
            "name": "compagencyref",
            "label": "Agency Reference",
            "value": "",
            "placeholder": "Agency Reference",
            "class": "col-md-12",
            "type": "text",
            "dataType" : "string"
        },

        {
            "name": "compdedno",
            "label": "Deduction Number",
            "value": "",
            "placeholder": "Deduction Number",
            "class": "col-md-12",
            "type": "dropdown",
            "dataType" : "string"
        },
    ],

}
