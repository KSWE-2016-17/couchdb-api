var DaoHelper = require("./DaoHelper")

var FriendDAO = function(connection) {
    this.connection = connection;
    this.daoHelper = new DaoHelper();
};

FriendDAO.prototype.findAll = function() {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/friends/_view/friendsALL");
};

FriendDAO.prototype.findById = function(id) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/friends/_view/friendsALL?key=[%22" + encodeURI(id) + "%22]");
};

FriendDAO.prototype.findByProfileId = function(id) {
    return this.daoHelper.find(this.connection.getFullUrl() + "_design/friends/_view/friendsByProfile?key=[%22" + encodeURI(id) + "%22]");
};

FriendDAO.prototype.create = function(obj) {
    return this.daoHelper.create(obj, this.connection.getFullUrl());
};

FriendDAO.prototype.update = function(obj) {
    return this.daoHelper.update(obj, this.connection.getFullUrl() + obj._id);
};

FriendDAO.prototype.createOrUpdate = function(obj) {
    if (obj._id) {
        return this.update(obj, this.connection.getFullUrl() + obj._id);
    } else {
        return this.create(obj, this.connection.getFullUrl());
    }
};

FriendDAO.prototype.delete = function(obj) {
    return this.daoHelper.delete(obj, this.connection.getFullUrl() + obj._id + "?rev=" + encodeURI(obj._rev));
};

exports.default = FriendDAO;
module.exports = exports.default;

