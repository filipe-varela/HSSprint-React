import logo from './HS_profile.png';
import './App.css';
import { materialRenderers, materialCells, } from '@jsonforms/material-renderers';
import React, { useEffect, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import uischema from './uischema.json';
import schema from './schema.json';
import CustomGroupRenderer, { CustomGroupTester } from './CustomGroup';
import initial_data from './initial_data.json';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((_theme) => ({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    textAlign: 'left',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    padding: "14px 18px",
    background: "#0e9553",
    borderRadius: "10px",
    color: "white",
    border: "2px solid #6dba83",
    margin: 'auto',
    display: 'block'
  },
  resetButtonHidden: {
    margin: 'auto',
    display: 'none',
  },
  demoform: {
    margin: 'auto',
    padding: '2rem',
  },
  divAdapted: {
    display: "flex",
    justifyContent: "center"
  }
}));

// todo fazer um initial_data com os sprints todos gerados

const renderers = [
  ...materialRenderers, 
  {
    tester: CustomGroupTester,
    renderer: CustomGroupRenderer,
  }
];

function App() {
  const classes = useStyles();
  const [displayDataAsString, setDisplayDataAsString] = useState('');
  const [data, setData]  = useState(initial_data);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  
  useEffect(() => {
    setDisplayDataAsString(JSON.stringify(data, null, 2))
  }, [data]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HSSprint <br/> Fill the form to deliver the report
        </p>
      </header>
      <div className={classes.demoform}>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={renderers}
          cells={materialCells}
          onChange={({ _errors, data }) => {
            if (data.name !== undefined) {
              data.name = data.name.trim(); 
            }
            if (data.description !== undefined) {
              data.description = data.description.trim(); 
            }
            if (data.etc !== undefined) {
              data.etc = data.etc.trim(); 
            }
            if (data.members.length) {
              for (let i = 0; i < data.members.length; i++) {
                if (data.members[i] !== undefined) {
                  data.members[i] = data.members[i].trim(); 
                }
              }
              schema.properties.tasks.items.properties.assignee.items.enum = data.members;
              data.project_manager = data.members[0];
            }
            if (data.tasks.length) {
              var task = data.tasks[0];
              if ("name_task" in task) {
                var added = [], doing = [], done = [], onhold = [], deprecated = [];
                for (let i = 0; i < data.tasks.length; i++) {
                  schema.properties.tasks.items.properties.sub_tasks.items.enum[i] = data.tasks[i].name_task;
                  switch (data.tasks[i].status) {
                    case "TO DO":
                      added.push(data.tasks[i].name_task);
                      break;
                    case "DOING":
                      doing.push(data.tasks[i].name_task);
                      break;
                    case "DONE":
                      done.push(data.tasks[i].name_task);
                      break;
                    case "ONHOLD":
                      onhold.push(data.tasks[i].name_task);
                      break;
                    case "DEPRECATED":
                      deprecated.push(data.tasks[i].name_task);
                      break;
                    default:
                      break;
                  }
                }
                schema.properties.sprints.items.properties.added.items.enum = added;
                schema.properties.sprints.items.properties.doing.items.enum = doing;
                schema.properties.sprints.items.properties.done.items.enum = done;
                schema.properties.sprints.items.properties.onhold.items.enum = onhold;
                schema.properties.sprints.items.properties.deprecated.items.enum = deprecated;
                console.log(schema.properties.tasks.items.properties.sub_tasks.items.enum);
              }
              setShowDownloadButton(true);
            } else {
              setShowDownloadButton(false);
            }
            console.log(showDownloadButton);
            setData(data);
          }}
          />
      </div>
      {/* <div className={classes.dataContent}>
        <pre id='boundData'>{displayDataAsString}</pre>
      </div> */}
      <div className={classes.divAdapted}>
        <a href={`data:text/json;charset=utf-8,${encodeURIComponent(displayDataAsString)}`} download="project.json">
          <button className={showDownloadButton ? classes.resetButton : classes.resetButtonHidden} >
            {`Download Json`}
          </button>
        </a>
      </div>
    </div>
  );
}

export default App;
