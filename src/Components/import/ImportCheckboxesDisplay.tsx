// import React from "react";
// import { InputGroup } from "react-bootstrap";
// import { StringRecord } from "../../utils/types/types";

// interface IImportCheckboxesDisplayProps {
//   options: any[];
//   checkboxStates: any;
//   handleCheckboxChange: (value: string) => void;
// }
// export const ImportCheckboxesDisplay = ({
//   options,
//   checkboxStates,
//   handleCheckboxChange,
// }: IImportCheckboxesDisplayProps) => {
//   return (
//     <>
//       {options.map((option: StringRecord) => (
//         <div key={option.value} className="p-3">
//           <InputGroup className="mb-3">
//             <InputGroup.Text>{option.label}</InputGroup.Text>
//             <InputGroup.Checkbox
//               id={option.value}
//               checked={checkboxStates[option.value].checked}
//               onChange={() => handleCheckboxChange(option.value)}
//             />
//           </InputGroup>
//         </div>
//       ))}
//     </>
//   );
// };

import React from "react";
import { FormControl, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { StringRecord } from "../../utils/types/types";

interface IImportCheckboxesDisplayProps {
  options: any[];
  checkboxStates: any;
  handleCheckboxChange: (value: string) => void;
}

export const ImportCheckboxesDisplay = ({
  options,
  checkboxStates,
  handleCheckboxChange,
}: IImportCheckboxesDisplayProps) => {
  return (
    <>
      {options.map((option: StringRecord) => (
        <div key={option.value} className="p-3">
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    id={option.value}
                    checked={checkboxStates[option.value].checked}
                    onChange={() => handleCheckboxChange(option.value)}
                  />
                }
                label={option.label}
              />
            </FormGroup>
          </FormControl>
        </div>
      ))}
    </>
  );
};
