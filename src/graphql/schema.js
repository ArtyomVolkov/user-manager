const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema} = require('graphql');
var DB = require('./db');

const User = new GraphQLObjectType({
	name: 'User',
	description: 'User model',
	fields: ()=> {
		return {
			id: {
				type: GraphQLInt,
				resolve(user) {
					return user.id;
				}
			},
			firstName: {
				type: GraphQLString,
				resolve(user) {
					return user.firstName;
				}
			},
			lastName: {
				type: GraphQLString,
				resolve(user) {
					return user.lastName;
				}
			},
			email: {
				type: GraphQLString,
				resolve(user) {
					return user.email;
				}
			}
		};
	}
});

const Query = new GraphQLObjectType({
	name: "Query",
	description: 'root query object',
	fields: ()=> {
		return {
			users: {
				type: new GraphQLList(User),
				args: {
					id: {type: GraphQLInt},
					email: {type: GraphQLString}
				},
				resolve(root, args) {
					return DB.models['users'].findAll({where: args});
				}
			}
		};
	}
});

const Schema = new GraphQLSchema({
	query: Query
});

module.exports = Schema;
