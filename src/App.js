import React, { useState, useEffect } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { TraceItem } from './components/TraceItem';

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
  const [activeRequest, setActiveRequest] = useState(null);

  useEffect(() => {
    if(file) loadFile();
  }, [file]);

  const onFileChange = event => {
    setActiveRequest(null);
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

  // const handleClick = traceCode => {
  //   console.log(traceCode);
  // };

  const showTraceInfo = () => {
    if (!xmlFile) return <h1>No trace loaded.</h1>
    else if(xmlFile === 'pending') return <h1>Loading...</h1>
    else {
      const requestsList= [];
      // const length= xmlFile.children[6].children.length;
      let content, apigee_code, target_code;
      for(let [i, request] of xmlFile.children[6].children.entries()){
        content= 'NA';
        apigee_code= 'NA';
        target_code= 'NA';
        // console.log(`it: ${i}`);
        for(let point of request.children[1].children){
          // console.log(1, point);
          try {
            
            if(point.children[0].children[1].children[0].value === 'PROXY_POST_RESP_SENT' && point.children[0].children[1].children[1].value === 'END'){
              for(let property of point.children[1].children){
                // console.log(2, property);
                if(property.name === 'Content'){
                  content= property.value;
                } else if(property.name === 'StatusCode'){
                apigee_code= property.value;
              }
              }
            }

          } catch (error) {
            
          }

          try {
            
            if(point.children[0].children[1].children[0].value === 'TARGET_RESP_FLOW' && point.children[0].children[1].children[1].value === 'RESP_START'){
              for(let property of point.children[1].children){
                // console.log(3, property);
                if(property.name === 'StatusCode'){
                target_code= property.value;
              }
              }
            }
            
          } catch (error) {
            
          }
          
        }
        requestsList.push(<TraceItem key={request.children[0].value} props = {{
          uri: request.children[1].children[3].children[1].children[1].value,
          method: request.children[1].children[3].children[1].children[2].value,
          number: i + 1,
          apigee_code,
          target_code,
          content
        }}  activeRequest={activeRequest} setActiveRequest={setActiveRequest} />);
        // }} onClickTraceItem={handleClick} />);
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