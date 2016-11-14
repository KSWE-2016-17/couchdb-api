var q = require("q");

var DaoHelper = require("./DaoHelper")

var MessageDAO = function(connection) {
    this.connection = connection;
    this.daoHelper = new DaoHelper();
};

MessageDAO.prototype.findAll = function() {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/msg/_view/msgALL");
};

MessageDAO.prototype.findById = function(id) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/msg/_view/msgALL?key=[%22" + encodeURI(id) + "%22]");
};

MessageDAO.prototype.findAvailableFrom = function(userid) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/msg/_view/msgALLAvailableFrom?key=%22" + encodeURI(userid) + "%22");
};
MessageDAO.prototype.findAvailableTo = function(userid) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/msg/_view/msgALLAvailableTo?key=%22" + encodeURI(userid) + "%22");
};

MessageDAO.prototype.findUndeleteFrom = function(userid) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/msg/_view/msgAllUndeletedFrom?key=%22" + encodeURI(userid) + "%22");
};
MessageDAO.prototype.findUndeleteTo = function(userid) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/msg/_view/msgAllUndeletedTo?key=%22" + encodeURI(userid) + "%22");
};
MessageDAO.prototype.findArchivedFrom = function(userid) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/msg/_view/msgAllArchivedFrom?key=%22" + encodeURI(userid) + "%22");
};
MessageDAO.prototype.findArchivedTo = function(userid) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/msg/_view/msgAllArchivedTo?key=%22" + encodeURI(userid) + "%22");
};

MessageDAO.prototype.findByTo = function(to) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/msg/_view/msgTo?key=[%22" + encodeURI(to) + "%22]");
};

MessageDAO.prototype.findByFrom = function(from) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/msg/_view/msgFrom?key=[%22" + encodeURI(from) + "%22]");
};

MessageDAO.prototype.create = function(obj) {
    return this.daoHelper.create(obj, this.connection.getFullUrl());
};

MessageDAO.prototype.update = function(obj) {
    return this.daoHelper.update(obj, this.connection.getFullUrl() + obj._id);
};

MessageDAO.prototype.createOrUpdate = function(obj) {
    if (obj._id) {
        return this.update(obj, this.connection.getFullUrl() + obj._id);
    } else {
        return this.create(obj, this.connection.getFullUrl());
    }
};

MessageDAO.prototype.delete = function(obj, userId) {
    var validOperation = false;

    if (obj.from === userId) {
        obj.deletedFrom = true;
        validOperation = true;
    } else if (obj.to === userId) {
        obj.deletedTo = true;
        validOperation = true;
    }

    if (validOperation) {
        return this.daoHelper.update(obj, this.connection.getFullUrl() + obj._id + "?rev=" + encodeURI(obj._rev));
    }

    var defer = q.defer();
    defer.reject("user is not sender or recipient of message");

    return defer.promise;
};

exports.default = MessageDAO;
module.exports = exports.default;

