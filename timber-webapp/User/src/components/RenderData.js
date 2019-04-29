
import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: "100%",
  width: "100%",
  margin: 20,
  padding : 20,
  textAlign: 'center',
  display: 'inline-block',
};

const RenderData = (props) => {
  console.log(props)
return(
  <div>
    <Paper style={style} zDepth={2} >
    <h5>{props.title}</h5>
    {Object.keys(props.data).map((key, i) => {
      return (
        <div key={i}>{key}:{props.data[key]}</div>
      )
    })}
    {/* {props.data.company} */}
    </Paper>
  </div>
)}

export default RenderData;
