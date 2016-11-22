var q = require("q");

var DaoHelper = require("./DaoHelper");

var PictureDAO = function(connection) {
    this.connection = connection;
    this.daoHelper = new DaoHelper();
};

PictureDAO.prototype.findAll = function() {
    return this.daoHelper.find(this.connection.getFullUrl() + '_design/picture/_view/picALL');
};

PictureDAO.prototype.findById = function(id) {
    return this.daoHelper.find(this.connection.getFullUrl() + '_design/picture/_view/picALL?key=[%22' + encodeURI(id) + '%22]');
};

PictureDAO.prototype.findAttachmentURLsById = function(id) {
    var self = this;

    var defer = q.defer();

    this.daoHelper.find(this.connection.getFullUrl() + '_design/picture/_view/picALL?key=[%22' + encodeURI(id) + '%22]')
        .then(function(data) {
            var urls = [];

            for (var i = 0; i < data.length; i++) {
                for (var attachment in data[i]._attachments) {
                    urls.push(self.connection.getFullUrl() + data[i]._id + '/' + attachment);
                }
            }

            if (callbacks && typeof callbacks.success === 'function') {
                callbacks.success(urls);
            }

            defer.resolve(urls);
        })
        .catch(function(err) {
            if (callbacks && typeof callbacks.error === 'function') {
                callbacks.error(err);
            }

            defer.reject(err);
        });

    return defer.promise;
};

PictureDAO.prototype.findByProfile = function(profile) {
    return this.daoHelper.find(this.connection.getFullUrl() + '_design/picture/_view/picForProfile?key=[%22' + encodeURI(profile) + '%22]');
};

PictureDAO.prototype.findAttachmentURLsByProfile = function(profile) {
    var self = this;

    var defer = q.defer();

    this.daoHelper.find(this.connection.getFullUrl() + '_design/picture/_view/picForProfile?key=[%22' + encodeURI(profile) + '%22]')
        .then(function(data) {
            var urls = [];

            for (var i = 0; i < data.length; i++) {
                for (var attachment in data[i]._attachments) {
                    urls.push(self.connection.getFullUrl() + data[i]._id + '/' + attachment);
                }
            }

            if (callbacks && typeof callbacks.success === 'function') {
                callbacks.success(urls);
            }

            defer.resolve(urls);
        })
        .catch(function(err) {
            if (callbacks && typeof callbacks.error === 'function') {
                callbacks.error(err);
            }

            defer.reject(err);
        });

    return defer.promise;
};

PictureDAO.prototype.create = function(obj) {
    return this.daoHelper.create(obj, this.connection.getFullUrl());
};

PictureDAO.prototype.update = function(obj) {
    return this.daoHelper.update(obj, this.connection.getFullUrl() + obj._id);
};

PictureDAO.prototype.createOrUpdate = function(obj) {
    if (obj._id) {
        return this.update(obj, this.connection.getFullUrl() + obj._id);
    } else {
        return this.create(obj, this.connection.getFullUrl());
    }
};

PictureDAO.prototype.delete = function(obj) {
    return this.daoHelper.delete(obj, this.connection.getFullUrl() + obj._id + '?rev=' + encodeURI(obj._rev));
};

exports.default = PictureDAO;
module.exports = exports.default;

