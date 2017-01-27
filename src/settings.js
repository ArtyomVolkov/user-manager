// General
const HOST_NAME = 'localhost';
const PROTOCOL = 'http';
const APP_PORT = 3000;
const SERVER_PORT = 3001;

// APIs
export const USERS = `${PROTOCOL}://${HOST_NAME}:${SERVER_PORT}/api/v1/users`;
export const CREATE_NEW_USER = `${PROTOCOL}://${HOST_NAME}:${SERVER_PORT}/api/v1/users/create`;
export const DELETE_USER = `${PROTOCOL}://${HOST_NAME}:${SERVER_PORT}/api/v1/users/delete/`;
export const UPDATE_USER = `${PROTOCOL}://${HOST_NAME}:${SERVER_PORT}/api/v1/users/update/`;
export const GRAPH_QL_API = `${PROTOCOL}://${HOST_NAME}:${SERVER_PORT}/api/v1/graphql`;
