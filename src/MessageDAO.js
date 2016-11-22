var q = require("q");

var DaoHelper = require("./DaoHelper");

var MessageDAO = function(connection) {
    this.connection = connection;
    this.daoHelper = new DaoHelper();
};

MessageDAO.prototype.findAll = function() {
    return this.daoHelper.find({
        query: '{ messages { _id from_id to_id title content archivedFrom archivedTo deletedFrom deletedTo } }'
    }, this.connection.getFullUrl());
};

MessageDAO.prototype.findById = function(id) {
    return this.daoHelper.find({
        query: '{ message(_id: "' + id + '") { _id from_id to_id title content archivedFrom archivedTo deletedFrom deletedTo } }'
    }, this.connection.getFullUrl());
};

MessageDAO.prototype.findAvailableFrom = function(id) {
    return this.daoHelper.find({
        query: '{ messages(filter: { from_id: "' + id + '", archivedFrom: false, deletedFrom: false }) { _id from_id to_id title content archivedFrom archivedTo deletedFrom deletedTo } }'
    }, this.connection.getFullUrl());
};
MessageDAO.prototype.findAvailableTo = function(id) {
    return this.daoHelper.find({
        query: '{ messages(filter: { to_id: "' + id + '", archivedTo: false, deletedTo: false }) { _id from_id to_id title content archivedFrom archivedTo deletedFrom deletedTo } }'
    }, this.connection.getFullUrl());
};

MessageDAO.prototype.findUndeleteFrom = function(id) {
    return this.daoHelper.find({
        query: '{ messages(filter: { from_id: "' + id + '", deletedFrom: false }) { _id from_id to_id title content archivedFrom archivedTo deletedFrom deletedTo } }'
    }, this.connection.getFullUrl());
};
MessageDAO.prototype.findUndeleteTo = function(id) {
    return this.daoHelper.find({
        query: '{ messages(filter: { to_id: "' + id + '", deletedTo: false }) { _id from_id to_id title content archivedFrom archivedTo deletedFrom deletedTo } }'
    }, this.connection.getFullUrl());
};

MessageDAO.prototype.findArchivedFrom = function(id) {
    return this.daoHelper.find({
        query: '{ messages(filter: { from_id: "' + id + '", archivedFrom: true }) { _id from_id to_id title content archivedFrom archivedTo deletedFrom deletedTo } }'
    }, this.connection.getFullUrl());
};
MessageDAO.prototype.findArchivedTo = function(id) {
    return this.daoHelper.find({
        query: '{ messages(filter: { to_id: "' + id + '", archivedTo: true }) { _id from_id to_id title content archivedFrom archivedTo deletedFrom deletedTo } }'
    }, this.connection.getFullUrl());
};

MessageDAO.prototype.findByTo = function(id) {
    return this.daoHelper.find({
        query: '{ messages(filter: { to_id: "' + id + '" }) { _id from_id to_id title content archivedFrom archivedTo deletedFrom deletedTo } }'
    }, this.connection.getFullUrl());
};

MessageDAO.prototype.findByFrom = function(id) {
    return this.daoHelper.find({
        query: '{ messages(filter: { from_id: "' + id + '" }) { _id from_id to_id title content archivedFrom archivedTo deletedFrom deletedTo } }'
    }, this.connection.getFullUrl());
};

MessageDAO.prototype.create = function(obj) {
    return this.daoHelper.create({
        query: 'mutation { createMessage(record: { from_id: "' + obj.from_id + '", to_id: "' + obj.to_id + '", title: "' + obj.title + '", content: "' + obj.content + '", archivedFrom: false, archiveTo: false, deletedFrom: false, deletedTo: false }) { record { _id from_id to_id title content archivedFrom archivedTo deletedFrom deletedTo } } }'
    }, this.connection.getFullUrl());
};

MessageDAO.prototype.update = function(obj) {
    return this.daoHelper.update({
        query: 'mutation { updateMessage(record: { _id: "' + obj._id + '", from_id: "' + obj.from_id + '", to_id: "' + obj.to_id + '", title: "' + obj.title + '", content: "' + obj.content + '", archivedFrom: false, archiveTo: false, deletedFrom: false, deletedTo: false }) { record { _id from_id to_id title content archivedFrom archivedTo deletedFrom deletedTo } } }'
    }, this.connection.getFullUrl());
};

MessageDAO.prototype.createOrUpdate = function(obj) {
    if (obj._id) {
        return this.update(obj);
    } else {
        return this.create(obj);
    }
};

MessageDAO.prototype.delete = function(obj) {
    return this.daoHelper.delete({
        query: 'mutation { removeMessage(_id: "' + obj._id + '") { _id from_id to_id title content archivedFrom archivedTo deletedFrom deletedTo } }'
    }, this.connection.getFullUrl());
};

exports.default = MessageDAO;
module.exports = exports.default;

