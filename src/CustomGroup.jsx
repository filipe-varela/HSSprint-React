import { rankWith, uiTypeIs } from "@jsonforms/core";
import { MaterialLayoutRenderer } from "@jsonforms/material-renderers";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import { Accordion, AccordionDetails, AccordionSummary, Hidden, Typography, } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from "react";

const CustomGroupRenderer = (props) => {
    const { uischema, schema, path, visible, renderers } = props;

    const layoutProps = {
        elements: uischema.elements,
        schema: schema,
        path: path,
        direction: 'column',
        visible: visible,
        uischema: uischema,
        renderers: renderers,
    };
    return (
        <Hidden xsUp={!visible}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{uischema.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MaterialLayoutRenderer {...layoutProps}/>
                </AccordionDetails>
            </Accordion>
        </Hidden>
    );
};

export default withJsonFormsLayoutProps(CustomGroupRenderer);
export const CustomGroupTester = rankWith(1000, uiTypeIs('Group'));