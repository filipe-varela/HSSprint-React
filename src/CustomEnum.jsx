import * as React from 'react';
import { useJsonForms, withJsonFormsControlProps } from '@jsonforms/react';
import { MaterialInputControl, MuiSelect } from '@jsonforms/material-renderers';
import { isEnumControl, rankWith, scopeEndsWith } from '@jsonforms/core';
import { CustomSelector } from './CustomSelector';

const CustomMembersEnumRenderer = (props) => {
    const context = useJsonForms();

    const members = context.core.data.members;

    return (
        <MaterialInputControl {...members} input={CustomSelector}/>
    );
};

export default withJsonFormsControlProps(CustomMembersEnumRenderer);
export const CustomMembersEnumTester = rankWith(1000, scopeEndsWith('assignee'));

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
