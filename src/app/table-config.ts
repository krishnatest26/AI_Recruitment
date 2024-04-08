// table-config.ts
export interface TableColumn {
    displayName: string;
    validations: {
      required: boolean;
      minLength: number;
      maxLength: number;
      pattern: RegExp;
      unique?: boolean; 
    };
  }
  
  export interface TableConfig {
    tableName: string;
    columns: { [fieldName: string]: TableColumn };
  }
  
  export const tableConfigs: TableConfig[] = [
    {
      tableName: "PAYROLLDEPARTMENTS",
      columns: {
        "DEPARTMENTNUMBER": {
          displayName: "Department Reference",
          validations: {
            required: true,
            minLength: 4,
            maxLength: 50,
            pattern: /^[0-9a-zA-Z]*$/,
            unique: true // Assuming DEPARTMENTNUMBER should be unique
          }
        },
        "DEPARTMENTDESCRIPTION": {
          displayName: "Department Name",
          validations: {
            required: true,
            minLength: 4,
            maxLength: 50,
            pattern: /^[0-9a-zA-Z]*$/
          }
        },
      }
    }
  ];
  