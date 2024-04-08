export interface IForm{
    addFormTitle: string,
    editFormTitle: string,
    formControls: IFormControl[],
    saveBtnTitle: string,
    cancelBtnTitle: string,
    modalSize: string
}


export interface IFormControl{
    name: string;
    label: string;
      value?: string | boolean;
    options?: { value: string; label: string }[]; // Updated options property
    radioOptions?: string[];
    placeholder?: string;
    class: string;
    type: string;
    dataType: string;
}


export interface IValidator {
    validatorName?: string;
    message?: string;
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    email?: string;
   greaterThan?: string;
}

export interface IOptions{
    id?: number,
    value?: string
    size?: string
    label?:string
}
