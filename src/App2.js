import React, { useState, useEffect } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
// import { TraceItem } from './components/TraceItem';
import { TraceItem } from './components/TraceItem2';

export const App = () => {

  const loadFile = async () => {
    setXmlFile('pending');
    const blob= URL.createObjectURL(file);
    const res= await axios.get(blob);
    const xmlPromise = new Promise((resolve, reject) => {
      resolve(new XMLParser().parseFromString(res.data));
    });
    const xml= await xmlPromise;
    setXmlFile(xml);
  };

  const [file, setFile] = useState(null);
  const [xmlFile, setXmlFile] = useState(null);
  // const [activeRequest, setActiveRequest] = useState(null);

  useEffect(() => {
    if(file) loadFile();
  }, [file]);

  const onFileChange = event => {
    // setActiveRequest(null);
    try {
      if(event.target.files[0].type === 'text/xml'){
        setFile(event.target.files[0]);
      } else {
        alert('Not an xml file');
      }
    } catch (error) {
      alert('Not an xml file');
    }
  };

  const showTraceInfo = () => {
    if (!xmlFile) return (
      <div>
        <h1>No trace loaded.</h1>
        <div className='app__first-time-info'>
          <h2>First time using this app? Follow below steps:</h2>
          <ol>
            <li>{'Run a trace for the proxy on which you are facing the error, check this documentation on '}
              <a href='https://devcenter.t-mobile.com/documents/5fc9819faf648f000780668c' rel="noopener noreferrer" target="_blank">
                how to run an apigee trace
              </a> in case this is the first time you run a trace.
            </li>
            <li>Download the trace.</li>
            <li>Click on the "Load trace" button at the top of this page and select the trace that you just downloaded.</li>
            <li>Wait for the trace information to load.</li>
            <li>Click on the request that contains the error to see the troubleshoot steps for the issue that you are facing.</li>
            <li>{'In case you are facing any issue with the tool, please reach out to '}
              <a href='https://app.slack.com/client/T02KY506W/C4SAFRARJ' rel="noopener noreferrer" target="_blank">
                #apigee
              </a> slack channel with a screenshot of the issue.
            </li>
          </ol>
        </div>
      </div>
    )
    else if(xmlFile === 'pending') return <h1>Loading...</h1>
    else {
      const requestsList= [];
      for(let [i, request] of xmlFile.children[6].children.entries()){
        requestsList.push(<TraceItem key={request.children[0].value}
        req={request.children[1].children}
        requestNumber={ i + 1 } />);
        // activeRequest={activeRequest}
        // setActiveRequest={setActiveRequest} />);
      }
      return requestsList.reverse();
    }
  };

  return (
    <div className= 'app'>
      <label className='app__input' style={ xmlFile === 'pending' ? { display: 'none' } : {} }>
        <input type="file" onChange={onFileChange} accept='.xml'/>
        <i className='fa fa-file' aria-hidden="true"></i>
        {
          xmlFile ? ' Load new trace' : ' Load trace'
        }
      </label>
      {
        showTraceInfo()
      }
    </div>
  );
};