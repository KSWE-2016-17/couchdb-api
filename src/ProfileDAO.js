var DaoHelper = require("./DaoHelper")

var ProfileDAO = function(connection) {
    this.connection = connection;
    this.daoHelper = new DaoHelper();
};

ProfileDAO.prototype.findAll = function() {
    return this.daoHelper.find({
        query: "{ profiles { _id aboutme children email eyecolor familystatus figure firstname lastname profilepic gender birthday privacy { friends pictures } user_id friends_ids } }"
    }, this.connection.getFullUrl());
};

ProfileDAO.prototype.findById = function(id) {
    return this.daoHelper.find({
        query: "{ profile(_id: '" + id + "') { _id aboutme children email eyecolor familystatus figure firstname lastname profilepic gender birthday privacy { friends pictures } user_id friends_ids } }"
    }, this.connection.getFullUrl());
};

ProfileDAO.prototype.findByUserId = function(id) {
    return this.daoHelper.find({
        query: "{ profiles(filter: { user_id: '" + id + "' }) { _id aboutme children email eyecolor familystatus figure firstname lastname profilepic gender birthday privacy { friends pictures } user_id friends_ids } }"
    }, this.connection.getFullUrl());
};

ProfileDAO.prototype.findByPreference = function(preference) {
    return this.daoHelper.find({
        query: "{ profiles(filter: { gender: " + preference.gender + ", eyecolor: " + preference.eyecolor + ", haircolor: " + preference.eyecolor + ", figure: " + preference.figure + " }) { _id aboutme children email eyecolor familystatus figure firstname lastname profilepic gender birthday privacy { friends pictures } user_id friends_ids } }"
    }, this.connection.getFullUrl());
};

ProfileDAO.prototype.findByEmail = function(email) {
    return this.daoHelper.find({
        query: "{ profiles(filter: { email: '" + email + "' }) { _id aboutme children email eyecolor familystatus figure firstname lastname profilepic gender birthday privacy { friends pictures } user_id friends_ids } }"
    }, this.connection.getFullUrl());
};

ProfileDAO.prototype.create = function(obj) {
    return this.daoHelper.create({
        query: "mutation { createProfile(record: { aboutme: '" + obj.aboutme + "', children: " + obj.children + ", email: '" + obj.email + "', eyecolor: " + obj.eyecolor + ", familystatus: " + obj.familystatus + ", figure: " + obj.figure + ", firstname: '" + obj.firstname + "', lastname: '" + obj.lastname + "', profilepic: '" + obj.profilepic + "', gender: " + obj.gender + ", birthday: '" + obj.birthday + "', privacy: " + JSON.stringify(obj.privacy) + ", user_id: '" + obj.user_id + "', friends_ids: " + JSON.stringify(obj.friends_ids) + " }) { record { _id aboutme children email eyecolor familystatus figure firstname lastname profilepic gender birthday privacy { friends pictures } user_id friends_ids } } }"
    }, this.connection.getFullUrl());
};

ProfileDAO.prototype.update = function(obj) {
    return this.daoHelper.update({
        query: "mutation { updateProfile(record: { _id: '" + obj._id + "', aboutme: '" + obj.aboutme + "', children: " + obj.children + ", email: '" + obj.email + "', eyecolor: " + obj.eyecolor + ", familystatus: " + obj.familystatus + ", figure: " + obj.figure + ", firstname: '" + obj.firstname + "', lastname: '" + obj.lastname + "', profilepic: '" + obj.profilepic + "', gender: " + obj.gender + ", birthday: '" + obj.birthday + "', privacy: " + JSON.stringify(obj.privacy) + ", user_id: '" + obj.user_id + "', friends_ids: " + JSON.stringify(obj.friends_ids) + " }) { record { _id aboutme children email eyecolor familystatus figure firstname lastname profilepic gender birthday privacy { friends pictures } user_id friends_ids } } }"
    }, this.connection.getFullUrl() + obj._id);
};

ProfileDAO.prototype.createOrUpdate = function(obj) {
    if (obj._id) {
        return this.update(obj);
    } else {
        return this.create(obj);
    }
};

ProfileDAO.prototype.delete = function(obj) {
    return this.daoHelper.delete({
        query: "mutation { removeProfile(_id: '" + obj._id + "') { _id aboutme children email eyecolor familystatus figure firstname lastname profilepic gender birthday privacy { friends pictures } user_id friends_ids } }"
    }, this.connection.getFullUrl());
};

exports.default = ProfileDAO;
module.exports = exports.default;

