var DaoHelper = require("./DaoHelper")

var PreferenceDAO = function(connection) {
    this.connection = connection;
    this.daoHelper = new DaoHelper();
};

PreferenceDAO.prototype.findAll = function() {
    return this.daoHelper.find({
        query: "{ preferences { _id profile_id gender ageFrom ageTo haircolor eyecolor figure } }"
    }, this.connection.getFullUrl());
};

PreferenceDAO.prototype.findById = function(id) {
    return this.daoHelper.find({
        query: "{ preference(id: '" + id + "') { _id profile_id gender ageFrom ageTo haircolor eyecolor figure } }"
    }, this.connection.getFullUrl());
};

PreferenceDAO.prototype.findByProfileId = function(id) {
    return this.daoHelper.find({
        query: "{ preferences(filter: { profile_id: '" + id + "' }) { _id profile_id gender ageFrom ageTo haircolor eyecolor figure } }"
    }, this.connection.getFullUrl());
};

PreferenceDAO.prototype.create = function(obj) {
    return this.daoHelper.create({
        query: "mutation { createPreference(record: { profile_id: '" + obj.profileId + "', gender: " + obj.gender + ", ageFrom: " + obj.ageFrom + ", ageTo: " + obj.ageTo + ", haircolor: " + obj.hairColor + ", eyecolor: " + obj.eyeColor + ", figure: " + obj.figure + " }) { record { _id profile_id gender ageFrom ageTo haircolor eyecolor figure } } }"
    }, this.connection.getFullUrl());
};

PreferenceDAO.prototype.update = function(obj) {
    return this.daoHelper.update({
        query: "mutation { updatePreference(record: { _id: '" + obj._id + "', profile_id: '" + obj.profileId + "', gender: " + obj.gender + ", ageFrom: " + obj.ageFrom + ", ageTo: " + obj.ageTo + ", haircolor: " + obj.hairColor + ", eyecolor: " + obj.eyeColor + ", figure: " + obj.figure + " }) { record { _id profile_id gender ageFrom ageTo haircolor eyecolor figure } } }"
    }, this.connection.getFullUrl());
};

PreferenceDAO.prototype.createOrUpdate = function(obj) {
    if (obj._id) {
        return this.update(obj);
    } else {
        return this.create(obj);
    }
};

PreferenceDAO.prototype.delete = function(obj) {
    return this.daoHelper.delete({
        query: "mutation { removePreference(id: '" + obj._id + "') { _id profile_id gender ageFrom ageTo haircolor eyecolor figure } }"
    }, this.connection.getFullUrl());
};

exports.default = PreferenceDAO;
module.exports = exports.default;

