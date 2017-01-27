import React, {Component} from 'react';
import {GRAPH_QL_API} from './../../../settings';

class GraphQlAPI extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		const {props} = this;
		return <iframe src={GRAPH_QL_API} width="1140" height="700"></iframe>
	}
}

export default GraphQlAPI;