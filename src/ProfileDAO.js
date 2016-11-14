var DaoHelper = require("./DaoHelper")

var ProfileDAO = function(connection) {
    this.connection = connection;
    this.daoHelper = new DaoHelper();
};

ProfileDAO.prototype.findAll = function() {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/profile/_view/profileALL");
};

ProfileDAO.prototype.findById = function(id) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/profile/_view/profileALL?key=[%22" + encodeURI(id) + "%22]");
};

ProfileDAO.prototype.findByUserId = function(id) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/profile/_view/profileByUser?key=[%22" + encodeURI(id) + "%22]");
};

ProfileDAO.prototype.findByPreference = function(preference) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/profile/_view/profileByPreference?key=[" + preference.gender + "," + preference.birthday + "," + preference.haircolor + "," + preference.eyecolor + "," + preference.figure + "]");
};

ProfileDAO.prototype.findByEmail = function(email) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/profile/_view/profileByEmail?key=[%22" + encodeURI(email) + "%22]");
};

ProfileDAO.prototype.create = function(obj) {
    return this.daoHelper.create(obj, this.connection.getFullUrl());
};

ProfileDAO.prototype.update = function(obj) {
    return this.daoHelper.update(obj, this.connection.getFullUrl() + obj._id);
};

ProfileDAO.prototype.createOrUpdate = function(obj) {
    if (obj._id) {
        return this.update(obj, this.connection.getFullUrl() + obj._id);
    } else {
        return this.create(obj, this.connection.getFullUrl());
    }
};

ProfileDAO.prototype.delete = function(obj) {
    return this.daoHelper.delete(obj, this.connection.getFullUrl() + obj._id + "?rev=" + encodeURI(obj._rev));
};

exports.default = ProfileDAO;
module.exports = exports.default;

