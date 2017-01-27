import React, {Component, PropTypes} from 'react';
import {Snackbar} from 'material-ui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Actions
import * as messageActions from './../../../actions/message';

@connect(
	state => ({
		message: state.message
	}),
	dispatch => ({
		actions: bindActionCreators(messageActions, dispatch)
	})
)
class Messenger extends Component {
	static propTypes = {
		message: PropTypes.object
	};

	static defaultProps = {
		message: {
			text: 'some message',
			action: 'close',
			duration: 3000
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			open: !!nextProps.message.id
		});
	}

	closeError =()=> {
		this.props.actions.closeMessage();
	};

	render() {
		const {props, state} = this;

		return (
			<Snackbar open={state.open}
				message={props.message.text || 'some message'}
				action={props.message.action}
				autoHideDuration={props.message.duration}
				onActionTouchTap={this.closeError}
				onRequestClose={this.closeError}
			/>
		)
	}
}

export default Messenger;