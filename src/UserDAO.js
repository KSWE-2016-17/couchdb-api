var DaoHelper = require("./DaoHelper");

var UserDAO = function(connection) {
    this.connection = connection.connection;
    this.daoHelper = new DaoHelper();
};

UserDAO.prototype.findAll = function() {
    return this.daoHelper.find({
        query: '{ users { _id login password role } }'
    }, this.connection.getFullUrl());
};

UserDAO.prototype.findById = function(id) {
    return this.daoHelper.find({
        query: '{ user(_id: "' + id + '") { _id login password role } }'
    }, this.connection.getFullUrl());
};

UserDAO.prototype.findByLogin = function(login) {
    return this.daoHelper.find({
        query: '{ users(filter: { login: "' + login + '" }) { _id login password role } }'
    }, this.connection.getFullUrl());
};

UserDAO.prototype.create = function(obj) {
    return this.daoHelper.create({
        query: 'mutation { createUser(record: { login: "' + obj.login + '", password: "' + obj.password + '", role: ' + obj.role + ' }) { record { _id login password role } } }'
    }, this.connection.getFullUrl());
};

UserDAO.prototype.update = function(obj) {
    return this.daoHelper.update({
        query: 'mutation { updateUser(record: { _id: "' + obj._id + '", login: "' + obj.login + '", password: "' + obj.password + '", role: ' + obj.role + ' }) { record { _id login password role } } }'
    }, this.connection.getFullUrl());
};

UserDAO.prototype.createOrUpdate = function(obj) {
    if (obj._id) {
        return this.update(obj);
    } else {
        return this.create(obj);
    }
};

UserDAO.prototype.remove = function(obj) {
    return this.daoHelper.remove({
        query: 'mutation { removeUser(_id: "' + obj._id + '") { record { _id login password role } } }'
    }, this.connection.getFullUrl());
};

exports.default = UserDAO;
module.exports = exports.default;
