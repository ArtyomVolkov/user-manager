import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import UserList from './components/UserList';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {props} = this;

    return (
      <div>
        <Card>
          <CardHeader
            title="User"
            subtitle="admin"
            actAsExpander={true}
            avatar="https://www.myresellerhome.com/images/user-icon-512.png"
          />
          <UserList />
        </Card>
      </div>
    )
  }
}

export default Dashboard;