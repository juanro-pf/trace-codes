import React from 'react';

export const TraceItem = props => {
  const { uri, method, number, apigee_code, target_code, content } = props.props;

  const backgroundColor = () => {
    if(method === 'GET') return { backgroundColor: 'blue' }
    else if(method === 'POST') return { backgroundColor: 'green' }
    else if(method === 'DELETE') return { backgroundColor: 'red' }
    else if(method === 'PUT') return { backgroundColor: 'orange' }
    else if(method === 'OPTIONS') return { backgroundColor: 'yellow' }
  }

  const numberColor = () => {
    if(apigee_code.startsWith('2')) return {}
    else return { color: 'red' }
  }

  const getCode = () => {
    if(content === 'NA') return content;
    const multiple = content.length / 10;
    let code = '';
    for(let i = parseInt(0); i < content.length; i= i + multiple){
      code += content[Math.floor(i)];
    }
    return `${content.length}-${code}`;
  }

  return (
    <div className='trace-item'>
      <div className='trace-item__number'>
        <p>{number}</p>
      </div>
      <div className='trace-item__status-code'>
        <p style={numberColor()}>{apigee_code}</p>
      </div>
      <div className='trace-item__method' style={backgroundColor()}>
        <p>{method}</p>
      </div>
      <div className='trace-item__uri'>
        <p>{uri}</p>
      </div>
      <div className='trace-item__trace-code'>
        <p>{`TC$${apigee_code}$${target_code}$${getCode()}`}</p>
      </div>
    </div>
  )
};