export interface IConfigData<T> {
  column_mapping: T;
  file_seperator: string;
  overwrite: boolean;
  staging_sql: string;
}

export interface IPatientColumnMapping {
  patient_id: string;
  gender: string | null;
  age: string | null;
  dod: string | null;
  dob: string | null;
}

export interface ILabEventsColumnMapping {
  labevent_id: string | null;
  patient_id: string | null;
  episode_id: string | null;
  specimen_id: string | null;
  itemid: string | null;
  charttime: string | null;
  storetime: string | null;
  value: string | null;
  valuenum: string | null;
  valueuom: string | null;
  ref_range_lower: string | null;
  ref_range_upper: string | null;
  flag: string | null;
  priority: string | null;
  comments: string | null;
}

export interface IAdmissionsColumnMapping {
  admission_id: string | null;
  patient_id: string | null;
  episode_id: string | null;
  admittime: string | null;
  dischtime: string | null;
  deathtime: string | null;
  admission_type: string | null;
  admission_location: string | null;
  discharge_location: string | null;
  insurance: string | null;
  language: string | null;
  marital_status: string | null;
  ethnicity: string | null;
  edregtime: string | null;
  edouttime: string | null;
  hospital_expire_flag: string | null;
}

export interface IChartEventsColumnMapping {
  patient_id: string | null;
  episode_id: string | null;
  vital_id: string | null;
  charttime: string | null;
  storetime: string | null;
  itemid: string | null;
  value: string | null;
  valuenum: string | null;
  valueuom: string | null;
  warning: string | null;
}

export interface IDiagnosisColumnMapping {
  diagnosis_id: string | null;
  patient_id: string | null;
  episode_id: string | null;
  charttime: string | null;
  diagnosis: string | null;
  diagnosis_description: string | null;
}

export interface StringRecord {
  [key: string]: string;
}
