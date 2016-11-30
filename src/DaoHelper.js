var q = require("q");

var DaoHelper = function() {};

DaoHelper.prototype.find = function(obj, dest) {
    var defer = q.defer();

    if (typeof $ === "function" && typeof $.ajax === "function") {
        $.ajax({
            url: dest,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(obj)
        }).success(function(data, textStatus, jqXHR) {
            var jsonResponse = data;
            var rows = [];

            for (var prop in jsonResponse.data) {
                if (jsonResponse.data.hasOwnProperty(prop)) {
                    rows = jsonResponse.data[prop];
                    break;
                }
            }

            defer.resolve(rows);
        }).error(function(jqXHR, textStatus, errorThrown) {
            defer.reject(errorThrown);
        });
    } else {
        fetch(dest, {
            method: "POST",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(obj)
        }).then(function(jsonResponse) {
            var rows = [];

            for (var prop in jsonResponse.data) {
                if (jsonResponse.data.hasOwnProperty(prop)) {
                    rows = jsonResponse.data[prop];
                    break;
                }
            }

            defer.resolve(rows);
        }).catch(function(err) {
            defer.reject(err);
        });
    }

    return defer.promise;
};

DaoHelper.prototype.create = function(obj, dest) {
    var defer = q.defer();

    if (typeof $ === "function" && typeof $.ajax === "function") {
        $.ajax({
            url: dest,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(obj)
        }).success(function(data, textStatus, jqXHR) {
            defer.resolve(data);
        }).error(function(jqXHR, textStatus, errorThrown) {
            defer.reject(errorThrown);
        });
    } else {
        fetch(dest, {
            method: "POST",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(obj)
        }).then(function(jsonResponse) {
            defer.resolve(jsonResponse)
        }).catch(function(err) {
            defer.reject(err);
        });
    }

    return defer.promise;
};

DaoHelper.prototype.update = function(obj, dest) {
    var defer = q.defer();

    if (typeof $ === "function" && typeof $.ajax === "function") {
        $.ajax({
            url: dest,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(obj)
        }).success(function(data, textStatus, jqXHR) {
            defer.resolve(data);
        }).error(function(jqXHR, textStatus, errorThrown) {
            defer.reject(errorThrown);
        });
    } else {
        fetch(dest, {
            method: "POST",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(obj)
        }).then(function(jsonResponse) {
            defer.resolve(jsonResponse);
        }).catch(function(err) {
            defer.reject(err);
        });
    }

    return defer.promise;
};

DaoHelper.prototype.delete = function(obj, dest) {
    var defer = q.defer();

    if (typeof $ === "function" && typeof $.ajax === "function") {
        $.ajax({
            url: dest,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(obj)
        }).success(function(data, textStatus, jqXHR) {
            defer.resolve(data);
        }).error(function(jqXHR, textStatus, errorThrown) {
            defer.reject(errorThrown);
        });
    } else {
        fetch(dest, {
            method: "POST",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(obj)
        }).then(function(jsonResponse) {
            defer.resolve(jsonResponse);
        }).catch(function(err) {
            defer.reject(err);
        });
    }

    return defer.promise;
};

exports.default = DaoHelper;
module.exports = exports.default;
