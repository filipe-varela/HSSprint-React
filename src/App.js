import logo from './logo.svg';
import './App.css';
import { materialRenderers, materialCells, } from '@jsonforms/material-renderers';
import React, { useEffect, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import uischema from './uischema.json';
import schema from './schema.json';
import CustomGroupRenderer, { CustomGroupTester } from './CustomGroup';

const renderers = [
  ...materialRenderers, 
  {
    tester: CustomGroupTester,
    renderer: CustomGroupRenderer,
  }
];

function App() {
  const [displayDataAsString, setDisplayDataAsString] = useState('');
  const [data, setData]  = useState({});
  
  useEffect(() => {
    setDisplayDataAsString(JSON.stringify(data, null, 2))
  }, [data]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={materialCells}
        onChange={({ _errors, data }) => setData(data)}
        />
      <div>
        <pre id='boundData'>{displayDataAsString}</pre>
      </div>
    </div>
  );
}

export default App;
