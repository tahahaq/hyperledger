import React, { Component } from 'react';
import {Container, Row, Col} from 'react-grid-system';
import SidebarComponent from "../sidebar";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { db } from '../../config/firebaseConfiguration';
import Confirmation from '../common/Confirmation';

export default class Users extends Component {

    state = {
        users : {
            "SVkkeoIvXHRbcMQx3SImDDwvN9t1" : {
                "address" : "loading ..",
                "email" : "loading ..",
                "ethereumAddress" : "loading ..",
                "name" : "loading ..",
                "transactionHash" : "loading ..",
                "type" : "loading .."
              }
        }
    }

    componentDidMount() {
        db.ref('/users').on("value", snapshot => {
            console.log(snapshot.val())
            this.setState({
                users : snapshot.val()
            })
        })
    }

  render() {
      var {users} = this.state;
    return (
      <div>
                <Row style={{margin: 0, padding: 0, height : "96vh"}}>
                    <Col sm={4}>
                        <SidebarComponent/>
                    </Col>
                    <Col sm={8}>
<Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Ethereum Address</TableHeaderColumn>
        <TableHeaderColumn>Email</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Type</TableHeaderColumn>
        <TableHeaderColumn></TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
                    {
              Object.keys(users).map((key, index) => {
                  console.log('====================================');
                  console.log(key);
                  console.log('====================================');
                return(
      <TableRow>
        <TableRowColumn>{users[key].ethereumAddress}</TableRowColumn>
        <TableRowColumn>{users[key].email}</TableRowColumn>
        <TableRowColumn>{users[key].name}</TableRowColumn>
        <TableRowColumn>{users[key].type}</TableRowColumn>
        <TableRowColumn> <Confirmation _id = {key}/> </TableRowColumn>
      </TableRow>
                )
            })
        }
        </TableBody>
      </Table>
                    </Col>
                    </Row>
      </div>
    )
  }
}

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
