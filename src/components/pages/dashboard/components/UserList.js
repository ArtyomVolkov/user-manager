import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class UserList extends Component {
	constructor(){
		
	}
	
	render() {
		const {props} = this;
		return (
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
						props.users.map((user) => {
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
			</Table>
		)
	}
}

export default UserList;
