import {
  IAdmissionsColumnMapping,
  IChartEventsColumnMapping,
  IConfigData,
  IDiagnosisColumnMapping,
  ILabEventsColumnMapping,
  IPatientColumnMapping,
} from "./types/types";

interface IStandardiseJSON {
  uuid: string;
  patients?: IConfigData<IPatientColumnMapping>;
  labevents?: IConfigData<ILabEventsColumnMapping>;
  chartevents?: IConfigData<IChartEventsColumnMapping>;
  admissions?: IConfigData<IAdmissionsColumnMapping>;
  diagnosis?: IConfigData<IDiagnosisColumnMapping>;
  source_schema_name?: string;
  etl_schema_name?: string;
  lookup_schema_name?: string;
}

// get all data from checked inputs
// make it into one big object which contains like this for eg.
/**
 * {
 *   patients: {
 *     column_mapping: {}
 *   },
 *   labevents: {
 *     column_mapping: {}
 *   }
 * }
 *
 */
export const getCheckedData = (data: any) => {
  return Object.entries(data).reduce((obj: any, [key, value]: [string, any]) => {
    if (value.checked === true) {
      obj[key] = value.column_mapping;
    }
    return obj;
  }, {});
};

// get data from points where the checkbox is checked.
// Please make sure data is passed through getCheckedData first.
export const getStandardiseJSON = (data: IStandardiseJSON): IStandardiseJSON => {
  // get data from points where the checkbox is checked.
  //   let checkedData = getCheckedData(data);

  // need to add these values to each of the objects.
  let returnData: IStandardiseJSON = Object.entries(data).reduce((obj: any, [key, value]) => {
    obj[key] = {
      column_mapping: value,
      file_separator: ",", // Add the file separator key with comma as value
      overwrite: true,
    };
    return obj;
  }, {});

  returnData.uuid = localStorage.getItem("userUUID") || "";
  returnData.source_schema_name = "ehrqc_" + localStorage.getItem("userUUID");
  returnData.etl_schema_name = "ehrqc_" + localStorage.getItem("userUUID");
  returnData.lookup_schema_name = "ehrqc_" + localStorage.getItem("userUUID");

  return returnData;
};
