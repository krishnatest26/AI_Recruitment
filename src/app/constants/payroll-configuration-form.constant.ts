import { IForm } from "../interface/form.interface";

export const payrollSettingFormConfig: IForm = {
    addFormTitle: '',
    editFormTitle: '',
    saveBtnTitle: '',
    cancelBtnTitle: '',
    modalSize: '',
    formControls: [
        {
            "name": "payrollid",
            "label": "Payroll ID",
            "value": "",
            "placeholder": "Payroll ID",
            "class": "pconfig col-md-6",
            "type": "text",
            "dataType" : "string"
        },
        {
            "name": "recalculationrequired",
            "label": "Recalculation Required",
            "value": false, // Assuming it's initially unchecked
            "class": "col-md-6 recalcultaion",
            "type": "checkbox",
            "dataType" : "string"
        },
        {
            "name": "companyname",
            "label": "Name",
            "value": "",
            "placeholder": "Name",
            "class": "pconfig col-md-6",
            "type": "text",
            "dataType" : "string"
        },
        // Continue adding form controls for other fields based on the provided details...

        {
            "name": "freezehmrcdata",
            "label": "Freeze HMRC data on commit",
            "value": false, // Assuming it's initially unchecked
            "class": "col-md-6 freez",
            "type": "checkbox",
            "dataType" : "string"
        },
        {
            "name": "companyfrequency",
            "label": "Frequency",
            "value": "",
            "class": "pconfig col-md-6",
            "type": "dropdown",
            "dataType" : "string",
            "options": [ // Assuming options are provided
                { "value": "A", "label": "Annual" },
                { "value": "M", "label": "Monthly" },
                { "value": "Q", "label": "Quarterly" },
                { "value": "W", "label": "Weekly" },
                { "value": "H", "label": "Hourly" },
                { "value": "L", "label": "Lunar" }
            ]
        }

    ],

}
