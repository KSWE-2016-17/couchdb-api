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
            var jsonResponse = JSON.parse(data);
            var rows = [];
            for (var index = 0; index < jsonResponse.rows.length; index++) {
                rows.push(jsonResponse.rows[index].value);
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
        }).then(function(response) {
            return response.json();
        }).then(function(jsonResponse) {
            var rows = [];
            for (var index = 0; index < jsonResponse.rows.length; index++) {
                rows.push(jsonResponse.rows[index].value);
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
            defer.resolve(JSON.parse(data));
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
        }).then(function(response) {
            return response.json();
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
            defer.resolve(JSON.parse(data));
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
        }).then(function(response) {
            return response.json();
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
            defer.resolve(JSON.parse(data));
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
        }).then(function(response) {
            return response.json();
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
