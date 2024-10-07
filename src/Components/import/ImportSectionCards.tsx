import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React from "react";
interface IImportSectionCardsProps {
  data: any;
}
export const ImportSectionCards = ({ data }: IImportSectionCardsProps) => {
  return (
    <>
      {Object.entries(data).map((section, index) => {
        return (
          <div key={"importSection" + section + index}>
            {/* <Accordion>
              <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>{section[0]}</Accordion.Header>
                {section[1] ? (
                  <>
                    <Accordion.Body>
                      {Object.entries(section[1]).map(([key, value]) => (
                        <div key={key}>
                          {key}: {JSON.stringify(value)}
                        </div>
                      ))}
                    </Accordion.Body>
                  </>
                ) : null}
              </Accordion.Item>
            </Accordion> */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>{section[0]}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {Object.entries(
                    section[1] as {
                      [key: string]: any;
                    }
                  ).map(([key, value]) => (
                    <div key={key}>
                      {key}: {JSON.stringify(value)}
                    </div>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </>
  );
};
