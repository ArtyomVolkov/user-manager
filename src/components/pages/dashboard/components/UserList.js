import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// material-ui components
import {IconMenu, MenuItem, IconButton, Divider, Dialog, List, RaisedButton,
	FlatButton, TextField, CircularProgress} from 'material-ui';
import {CardActions} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// material-ui icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ContentAdd from 'material-ui/svg-icons/content/add';
// actions
import * as userActions from './../../../../actions/db-actions';
import * as messageAction from './../../../../actions/message';
//utils
import {cloneObject} from './../../../../utils/common';
// common styles
import STYLES from './../../../../utils/styles';

@connect(
	(state, props) => ({
		users: state.users
	}),
	(dispatch) => ({
		actions: bindActionCreators(userActions, dispatch),
		message: bindActionCreators(messageAction, dispatch)
	})
)
class UserList extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			loading: false,
			createUserDialog: false,
			removeUserDialog: false,
			editUserDialog: false
		};
		this.activeUser = {};
		this.newUser = {};
		this.fetchUsers();
	}

	fetchUsers() {
		const {props} = this;

		if (!props.users.length) {
			props.actions.fetchUsers();
		}
	}

	openDialog(name) {
		if(!this.state[name]) {
			this.setState({
				[name]: true
			});
		}
	}

	closeDialog(name) {
		if (this.state[name]) {
			this.setState({
				[name]: false
			});
		}
	}

	onChangeUserField =(event, value) => {
		this.newUser[event.target.name] = value;
	};

	onUpdateUserField =(event, value) => {
		this.activeUser[event.target.name] = value;
	};

	onAddNewUser =()=> {
		this.openDialog('createUserDialog');
	};

	createNewUser =()=> {
		const {props, newUser} = this;
		if (!newUser.firstName || !newUser.email) {
			return;
		}

		props.actions.createUser(newUser).
		then((response) => {
			newUser.id = response.data[0].id;
			props.users.push(newUser);
			// clear obj new user
			this.newUser = {};
			this.closeDialog('createUserDialog');
		}).
		catch((error) => {
			this.closeDialog('createUserDialog');
			props.message.setMessage({
				type: 'error',
				text: error.message,
				action: 'close',
				duration: 3000
			});
		});
	};

	onEditUser(user, index) {
		if (!user) {
			return;
		}

		this.activeUser = cloneObject(Object.assign(user, {index: index}));
		this.openDialog('editUserDialog');
	}

	editUser =()=> {
		const {props, activeUser} = this;
		if (!props.users[activeUser.index]) {
			return;
		}

		props.actions.updateUser(activeUser).
		then((response) => {
			props.users[activeUser.index] = activeUser;
			this.closeDialog('editUserDialog');
		}).
		catch((error) => {
			this.closeDialog('editUserDialog');
			props.message.setMessage({
				type: 'error',
				text: error.message,
				action: 'close',
				duration: 3000
			});
		});
	};

	onRemoveUser(id) {
		if (!this.activeUser) {
			return;
		}
		this.activeUser.id = id;
		this.openDialog('removeUserDialog');
	}

	removeUser =()=> {
		const {props, activeUser} = this;
		props.actions.deleteUser(activeUser.id).
		then((response) => {
			props.users.splice(activeUser.index, 1);
			this.closeDialog('removeUserDialog');
		}).
		catch((error) => {
			this.closeDialog('removeUserDialog');
			props.message.setMessage({
				type: 'error',
				text: error.message,
				action: 'close',
				duration: 3000
			});
		});
	};
	
	render() {
		const {props, state, activeUser} = this;
		
		return (
			<div>
				<CardActions>
					<RaisedButton
						label="Add new User"
						labelPosition="before"
						onClick={this.onAddNewUser}
						icon={<ContentAdd />}
					/>
				</CardActions>
				{state.loading && <CircularProgress size={60} thickness={7} style={{left: '50%'}} />}
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
							props.users.map((user, index) => {
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
												<MenuItem onClick={this.onEditUser.bind(this, user, index)}>
													<EditorModeEdit style={STYLES.icon} />
													<span style={STYLES.label}>edit</span>
												</MenuItem>
												<Divider />
												<MenuItem onClick={this.onRemoveUser.bind(this, user.id)}>
													<ActionDeleteForever style={STYLES.icon} />
													<span style={STYLES.label}>remove</span>
												</MenuItem>
											</IconMenu>
										</TableRowColumn>
									</TableRow>
								);
							})
						}
					</TableBody>
				</Table>
				<Dialog
					title="Add New User"
					actions={[
            <FlatButton label="create" primary={true} onTouchTap={this.createNewUser} />,
            <FlatButton label="cancel" secondary={true} onTouchTap={this.closeDialog.bind(this, 'createUserDialog')} />
          ]}
					open={state.createUserDialog}
					contentStyle={STYLES.dialogs.create}>
					<List>
						<TextField hintText="First Name" fullWidth={true} name={'firstName'} onChange={this.onChangeUserField} />
						<br/>
						<TextField hintText="Last Name" fullWidth={true} name={'lastName'} onChange={this.onChangeUserField} />
						<br />
						<TextField hintText="Email" fullWidth={true} name={'email'} onChange={this.onChangeUserField} />
					</List>
				</Dialog>
				<Dialog title="Remove user ?"
					open={state.removeUserDialog}
					contentStyle={STYLES.dialogs.remove}
					actions={
            [<FlatButton label="remove" primary={true} onTouchTap={this.removeUser} />,
             <FlatButton label="cancel" secondary={true} onTouchTap={this.closeDialog.bind(this, 'removeUserDialog')} />
            ]
          }
				/>
				<Dialog title="Update user"
					open={state.editUserDialog}
					contentStyle={STYLES.dialogs.edit}
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

export default UserList;
