import React, {Component} from 'react';
import {Card, CardHeader, CardActions} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

// actions
import {getUsers} from './../../actions/db-actions';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isError: false,
      createUserDialog: false,
      errorMessage: '',
      users: []
    };

    this.newUser = {
      firstName: '',
      lastName: '',
      email: ''
    };
  }

  componentDidMount(){
    this.fetchUsers();
  }

  fetchUsers() {
    this.setState({
      loading: true
    });
    getUsers().
    then((response) => {
      this.setState({
        loading: false,
        users: response.data
      });
    }).
    catch((error) => {
      this.setState({
        loading: false,
        isError: true,
        errorMessage: error.message
      });
    });
  }

  closeError =()=> {
    this.setState({
      isError: false
    });
  };

  onAddNewUser =()=> {
    if (!this.state.createUserDialog) {
      this.setState({
        createUserDialog: true
      });
    }
  };

  createNewUser =()=> {
    console.log(this.newUser);
  };

  onChangeUserField =(event, value) => {
    this.newUser[event.target.name] = value;
  };

  closeDialogs(name) {
    if (name === 'createUserDialog') {
      // clear user data
      this.newUser = {};
    }

    if (this.state[name]) {
      this.setState({
        [name]: false
      });
    }
  }

  render() {
    const {state} = this;
    const actions = [
      <FlatButton label="create" primary={true} onTouchTap={this.createNewUser} />,
      <FlatButton label="cancel" secondary={true} onTouchTap={this.closeDialogs.bind(this, 'createUserDialog')} />
    ];

    return (
      <div>
        <Card>
          <CardHeader
            title="User"
            subtitle="admin"
            actAsExpander={true}
            avatar="https://www.myresellerhome.com/images/user-icon-512.png"
          />
          <CardActions>
            <RaisedButton
              label="Add new User"
              labelPosition="before"
              onClick={this.onAddNewUser}
              icon={<ContentAdd />}
            />
          </CardActions>
          {state.loading && <CircularProgress size={60} thickness={7} style={{left: '50%'}} />}
          {state.users.length > 0 &&
          <Table fixedHeader={true} multiSelectable={true}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>First Name</TableHeaderColumn>
                <TableHeaderColumn>Last Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                state.users.map((user) => {
                  return (
                    <TableRow key={user.id} hoverable={true} striped={true}>
                      <TableRowColumn>{user.id}</TableRowColumn>
                      <TableRowColumn>{user.firstName}</TableRowColumn>
                      <TableRowColumn>{user.lastName}</TableRowColumn>
                      <TableRowColumn>{user.email}</TableRowColumn>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>}
        </Card>
        <Snackbar
          open={state.isError}
          message={state.errorMessage}
          action="close"
          autoHideDuration={4000}
          onRequestClose={this.closeError}
        />
        <Dialog
          title="Add New User"
          actions={actions}
          open={state.createUserDialog}
          contentStyle={{maxWidth: 500}}>
          <List>
            <TextField hintText="First Name" fullWidth={true} name={'firstName'} onChange={this.onChangeUserField} />
            <br/>
            <TextField hintText="Last Name" fullWidth={true} name={'lastName'} onChange={this.onChangeUserField} />
            <br />
            <TextField hintText="Email" fullWidth={true} name={'email'} onChange={this.onChangeUserField} />
          </List>
        </Dialog>
      </div>
    )
  }
}

export default Dashboard;