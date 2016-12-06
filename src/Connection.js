var Connection = function(connectionProperties) {
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

exports.default = Connection;
module.exports = exports.default;
