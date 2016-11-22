var DaoManager = function(connectionProperties) {
    this._daos = {};
    this.connection = {
        url: "" // Mandatory
    };
    this.connection.getFullUrl = function() {
        return this.url;
    };

    if (connectionProperties) {
        if (connectionProperties.url) {
            this.connection.url = connectionProperties.url;
        } else {
            console.error("No URL given!")
        }
    } else {
        console.error("No connection properties given!");
    }
};

DaoManager.prototype.getDao = function(dao) {
    if (!this._daos[dao]) {
        this._daos[dao] = this.createDao(dao);
    }

    return this._daos[dao];
};

DaoManager.prototype.createDao = function(dao) {
    return new dao(this.connection);
};

exports.default = DaoManager;
module.exports = exports.default;
