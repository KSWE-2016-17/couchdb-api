var DaoHelper = require("./DaoHelper");

var FriendRequestDAO = function(connection) {
    this.connection = connection.connection;
    this.daoHelper = new DaoHelper();
};

FriendRequestDAO.prototype.findAll = function() {
    return this.daoHelper.find({
        query: '{ friendRequests { _id from_id to_id } }'
    }, this.connection.getFullUrl());
};

FriendRequestDAO.prototype.findById = function(id) {
    return this.daoHelper.find({
        query: '{ friendRequest(_id: "' + id + '") { _id from_id to_id } }'
    }, this.connection.getFullUrl());
};

FriendRequestDAO.prototype.findByFrom = function(id) {
    return this.daoHelper.find({
        query: '{ friendRequests(filter: { from_id: "' + id + '" }) { _id from_id to_id } }'
    }, this.connection.getFullUrl());
};

FriendRequestDAO.prototype.findByTo = function(id) {
    return this.daoHelper.find({
        query: '{ friendRequests(filter: { to_id: "' + id + '" }) { _id from_id to_id } }'
    }, this.connection.getFullUrl());
};

FriendRequestDAO.prototype.create = function(obj) {
    return this.daoHelper.create({
        query: 'mutation { createFriendRequest(record: { from_id: "' + obj.from_id + '", to_id: "' + obj.to_id + '" }) { record { _id from_id to_id } } }'
    }, this.connection.getFullUrl());
};

FriendRequestDAO.prototype.update = function(obj) {
    return this.daoHelper.update({
        query: 'mutation { updateFriendRequest(record: { _id: "' + obj._id + '", from_id: "' + obj.from_id + '", to_id: "' + obj.to_id + '" }) { record { _id from_id to_id } } }'
    }, this.connection.getFullUrl());
};

FriendRequestDAO.prototype.createOrUpdate = function(obj) {
    if (obj._id) {
        return this.update(obj);
    } else {
        return this.create(obj);
    }
};

FriendRequestDAO.prototype.remove = function(obj) {
    return this.daoHelper.remove({
        query: 'mutation { removeFriendRequest(_id: "' + obj._id + '") { _id from_id to_id } }'
    }, this.connection.getFullUrl());
};

exports.default = FriendRequestDAO;
module.exports = exports.default;
