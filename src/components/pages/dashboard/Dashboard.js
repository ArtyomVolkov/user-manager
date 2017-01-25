import React, {Component} from 'react';
import {Card, CardHeader, CardActions} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

// actions
import {getUsers, createUser, deleteUser, updateUser} from '../../../actions/db-actions';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isError: false,
      createUserDialog: false,
      removeUserDialog: false,
      editUserDialog: false,
      errorMessage: '',
      users: []
    };

    this.newUser = {
      firstName: '',
      lastName: '',
      email: ''
    };
    this.activeUser = {};
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
    this.openDialog('createUserDialog');
  };

  onEditUser(user) {
    if (!user) {
      return;
    }
    this.activeUser = user;
    this.openDialog('editUserDialog');
  }

  onRemoveUser(id) {
    if (!id) {
      return;
    }
    this.openDialog('removeUserDialog');
  }

  createNewUser =()=> {
    if (!this.newUser.firstName || !this.newUser.email) {
      return;
    }

    createUser(this.newUser).
    then((response) => {
      this.newUser.id = response.data[0].id;
      this.setState({
        users: [...this.state.users, this.newUser]
      });
      this.closeDialog('createUserDialog');
    }).
    catch((error) => {
      this.setState({
        isError: true,
        errorMessage: error.message
      });
    });
  };

  editUser =()=> {
    if (!this.activeUser.id) {
      return;
    }

    updateUser(this.activeUser).
    then((response) => {
      this.setState({
        users: this.state.users
      });
      this.closeDialog('editUserDialog');
    }).
    catch((error) => {
      this.setState({
        isError: true,
        errorMessage: error.message
      });
    });
  };

  removeUser =()=> {
    if (!this.activeUser.id) {
      return;
    }

    deleteUser(this.activeUser.id).
    then((response) => {
      let index = this.state.users.findIndex((user) => user.id === this.activeUser.id);

      if (index !== -1) {
        let users = this.state.users;
        users.splice(index, 1);

        this.setState({
          users: users
        });
        this.closeDialog('removeUserDialog');
      }
    }).
    catch((error) => {
      this.setState({
        isError: true,
        errorMessage: error.message
      });
    });
  };

  onChangeUserField =(event, value) => {
    this.newUser[event.target.name] = value;
  };

  onUpdateUserField =(event, value) => {
    this.activeUser[event.target.name] = value;
  };

  openDialog(name) {
    if(!this.state[name]) {
      this.setState({
        [name]: true
      });
    }
  }

  closeDialog(name) {
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
    const {state, activeUser} = this;

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
          <Table fixedHeader={true} selectable={false}>
            <TableHeader enableSelectAll={false} adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>First Name</TableHeaderColumn>
                <TableHeaderColumn>Last Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn style={{width: 50}}>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                state.users.map((user) => {
                  return (
                    <TableRow key={user.id}>
                      <TableRowColumn>{user.id}</TableRowColumn>
                      <TableRowColumn>{user.firstName}</TableRowColumn>
                      <TableRowColumn>{user.lastName}</TableRowColumn>
                      <TableRowColumn>{user.email}</TableRowColumn>
                      <TableRowColumn style={{width: 50}}>
                        <IconMenu
                          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                          anchorOrigin={{horizontal: 'left', vertical: 'top'}}>
                          <MenuItem primaryText="Edit" onClick={this.onEditUser.bind(this, user)}/>
                          <MenuItem primaryText="Remove" onClick={this.onRemoveUser.bind(this, user.id)} />
                        </IconMenu>
                      </TableRowColumn>
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
          actions={[
            <FlatButton label="create" primary={true} onTouchTap={this.createNewUser} />,
            <FlatButton label="cancel" secondary={true} onTouchTap={this.closeDialog.bind(this, 'createUserDialog')} />
          ]}
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
        <Dialog title="Remove user"
          open={state.removeUserDialog}
          contentStyle={{maxWidth: 300}}
          actions={
            [<FlatButton label="remove" primary={true} onTouchTap={this.removeUser} />,
             <FlatButton label="cancel" secondary={true} onTouchTap={this.closeDialog.bind(this, 'removeUserDialog')} />
            ]
          }
        />
        <Dialog title="Update user"
          open={state.editUserDialog}
          contentStyle={{maxWidth: 500}}
          actions={
            [<FlatButton label="update" primary={true} onTouchTap={this.editUser} />,
             <FlatButton label="cancel" secondary={true} onTouchTap={this.closeDialog.bind(this, 'editUserDialog')} />
            ]
          }>
          <List>
            <TextField hintText="First Name" fullWidth={true} name={'firstName'}
             defaultValue={activeUser.firstName}
             onChange={this.onUpdateUserField} />
            <br />
            <TextField hintText="Last Name" fullWidth={true} name={'lastName'}
              defaultValue={activeUser.lastName}
              onChange={this.onUpdateUserField} />
            <br />
            <TextField hintText="Email" fullWidth={true} name={'email'}
              defaultValue={activeUser.email}
              onChange={this.onUpdateUserField} />
          </List>
        </Dialog>
      </div>
    )
  }
}

export default Dashboard;