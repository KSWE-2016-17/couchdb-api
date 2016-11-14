var DaoHelper = require("./DaoHelper")

var UserDAO = function(connection) {
    this.connection = connection;
    this.daoHelper = new DaoHelper();
};

UserDAO.prototype.findAll = function() {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/user/_view/userALL");
};

UserDAO.prototype.findById = function(id) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/user/_view/userALL?key=[%22" + encodeURI(id) + "%22]");
};

UserDAO.prototype.findByLogin = function(login) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/user/_view/userLogin?key=[%22" + encodeURI(login) + "%22]");
};

UserDAO.prototype.create = function(obj) {
    return this.daoHelper.create(obj, this.connection.getFullUrl());
};

UserDAO.prototype.update = function(obj) {
    return this.daoHelper.update(obj, this.connection.getFullUrl() + obj._id);
};

UserDAO.prototype.createOrUpdate = function(obj) {
    if (obj._id) {
        return this.update(obj, this.connection.getFullUrl() + obj._id);
    } else {
        return this.create(obj, this.connection.getFullUrl());
    }
};

UserDAO.prototype.delete = function(obj) {
    return this.daoHelper.delete(obj, this.connection.getFullUrl() + obj._id + "?rev=" + encodeURI(obj._rev));
};

exports.default = UserDAO;
module.exports = exports.default;

