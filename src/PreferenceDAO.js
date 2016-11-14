var DaoHelper = require("./DaoHelper")

var PreferenceDAO = function(connection) {
    this.connection = connection;
    this.daoHelper = new DaoHelper();
};

PreferenceDAO.prototype.findAll = function() {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/preference/_view/preferenceALL");
};

PreferenceDAO.prototype.findById = function(id) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/preference/_view/preferenceALL?key=[%22" + encodeURI(id) + "%22]");
};

PreferenceDAO.prototype.findByProfileId = function(id) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/preference/_view/preferenceByProfile?key=[%22" + encodeURI(id) + "%22]");
};

PreferenceDAO.prototype.create = function(obj) {
    return this.daoHelper.create(obj, this.connection.getFullUrl());
};

PreferenceDAO.prototype.update = function(obj) {
    return this.daoHelper.update(obj, this.connection.getFullUrl() + obj._id);
};

PreferenceDAO.prototype.createOrUpdate = function(obj) {
    if (obj._id) {
        return this.update(obj, this.connection.getFullUrl() + obj._id);
    } else {
        return this.create(obj, this.connection.getFullUrl());
    }
};

PreferenceDAO.prototype.delete = function(obj) {
    return this.daoHelper.delete(obj, this.connection.getFullUrl() + obj._id + "?rev=" + encodeURI(obj._rev));
};

exports.default = PreferenceDAO;
module.exports = exports.default;

