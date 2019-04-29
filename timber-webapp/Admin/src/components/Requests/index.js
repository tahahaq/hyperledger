import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system';
import { post_request } from '../../utils/helper';
import { connect } from 'react-redux';
import SidebarComponent from '../sidebar'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { api_base_url } from '../../config/api';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class index extends Component {

  state = {
    requests : [{
      company : 'loading ...',
      company_id : 'loading ...',
      timber_id : 'loading ...'

  }]
  }

  componentDidMount() {
    console.log('====================================');
    console.log(this.props.uuid);
    console.log('====================================');
    post_request(api_base_url+'/admin/pending-request', {uid : this.props.uuid})
    .then(res => {
      console.log('====================================');
      if(res.data){
        console.log(res.data.result);
        let data = res.data.result;
        let combine_arr = data.source.concat(data.packager, data.shipper, data.designer)
  
        console.log(combine_arr);
        this.setState({
          requests : combine_arr
        })
      }
  })
}  

handlerAccept = (id, participant, _id) => {
  let pos = this.state.requests.map(function(e) { return e.member_id; }).indexOf(id);
let arr=this.state.requests;
arr.splice(pos,1);
post_request(api_base_url+'/admin/approve-request', {
  uid : this.props.uuid,
  _id : _id,
  participant : participant
}).then(res => console.log(res))
this.setState({ 
  requests:arr
})
}

  render() {
    const { classes } = this.props;
    const bull = <span>•</span>;
    return (
      <div>
  <Container style = {{margin : 0, padding : 0}}>
  <Row style={{margin: 0, padding: 0, height : "96vh"}}>
    <Col sm={4}>
    <SidebarComponent/>
    </Col>
    <Col sm={8}>
    <h1>Requests</h1>
    <Container style = {{margin : 0, padding : 0}}>
  <Row style={{margin: 0, padding: 0, height : "96vh"}}>
  {
    this.state.requests.map((item, i) => (
    <Col sm={6}>
    <Paper zDepth = {2}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="h2">
          {item.company}
        </Typography>
        <Typography color="textSecondary">
          {item.participant}
        </Typography>
        <Typography component="p">
          Timber ID : {item.timber_id}
          <br />
          Company ID : {item.company_id}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick = {() => {this.handlerAccept(item.member_id, item.participant, item._id)} }>Accept</Button>
      </CardActions>
    </Paper>
    </Col>
    ))
  }
    </Row>
    </Container>
    </Col>
  </Row>
</Container>
      </div>
    )
  }
}
 
function mapStateToProp(state) {
  return ({
    uuid : state.root.uuid
  })
}

export default connect(mapStateToProp, null)(index)