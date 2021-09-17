import { rankWith, uiTypeIs } from "@jsonforms/core";
import { MaterialLayoutRenderer } from "@jsonforms/material-renderers";
import { MaterialArrayControlRenderer } from "@jsonforms/material-renderers/lib/complex/MaterialArrayControlRenderer";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import React from "react";

// interface MembersControlProps {
//     data: any;
//     handleChange(path: string, value: any): void;
//     path: string;
// }

// const MembersControl = ({ data, handleChange, path } : MembersControlProps) => {

// };

// https://jsonforms.io/docs/tutorial/custom-renderers
// https://jsonforms.discourse.group/t/dynamically-updating-enums-and-issue-with-ajv/87
// https://jsonforms.discourse.group/t/custom-array-of-enumerations/378
// https://jsonforms.discourse.group/t/storing-output-into-json-files/83
