import { IForm } from "../interface/form.interface";

export const departmentFormConfig: IForm = {
    addFormTitle: 'Add Department',
    editFormTitle: 'Edit Department',
    saveBtnTitle: 'Save Changes',
    cancelBtnTitle: 'Cancel',
    modalSize: 'sm',

    formControls: [
      {
          "name": "job_title",
          "label": "Job Title",
          "value": "",
          "placeholder": "Job Title",
          "class": "col-md-12",
          "type": "text",
          "dataType": "string"
      },
      {
          "name": "job_short_description",
          "label": "Short Description",
          "value": "",
          "placeholder": "Short Description",
          "class": "col-md-12",
          "type": "text",
          "dataType": "string"
      },
      {
          "name": "country_name",
          "label": "Country",
          "value": "",
          "placeholder": "Country Name",
          "class": "col-md-12",
          "type": "text",
          "dataType": "string"
      },
      {
          "name": "department_name",
          "label": "Department",
          "value": "",
          "placeholder": "Department Name",
          "class": "col-md-12",
          "type": "text",
          "dataType": "string"
      },

      {
        "name": "location_Name",
        "label": "Location",
        "value": "",
        "placeholder": "Location Name",
        "class": "col-md-12",
        "type": "text",
        "dataType": "string"
    },
      {
          "name": "role_Name",
          "label": "Role",
          "value": "",
          "placeholder": "Role Name",
          "class": "col-md-12",
          "type": "text",
          "dataType": "string"
      },
      {
          "name": "recruiterName",
          "label": "Recruiter",
          "value": "",
          "placeholder": "Recruiter Name",
          "class": "col-md-12",
          "type": "text",
          "dataType": "string"
      },
      {
          "name": "technicalSkills",
          "label": "Technical Skills",
          "value": "",
          "placeholder": "Technical Skills",
          "class": "col-md-12",
          "type": "text",
          "dataType": "string"
      },
      {
          "name": "experience",
          "label": "Experience",
          "value": "",
          "placeholder": "Experience",
          "class": "col-md-12",
          "type": "text",
          "dataType": "string"
      },
      {
          "name": "responsibility",
          "label": "Responsibility",
          "value": "",
          "placeholder": "Responsibility",
          "class": "col-md-12",
          "type": "text",
          "dataType": "string"
      },
      {
          "name": "degree",
          "label": "Degree",
          "value": "",
          "placeholder": "Degree",
          "class": "col-md-12",
          "type": "text",
          "dataType": "string"
      },
      {
          "name": "softSkills",
          "label": "Soft Skills",
          "value": "",
          "placeholder": "Soft Skills",
          "class": "col-md-12",
          "type": "text",
          "dataType": "string"
      },
      {
          "name": "certificate",
          "label": "Certificate",
          "value": "",
          "placeholder": "Certificate",
          "class": "col-md-12",
          "type": "text",
          "dataType": "string"
      }
  ],

}
