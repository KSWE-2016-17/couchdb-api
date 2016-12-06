var DaoManager = require("./DaoManager");
var UserDAO = require("./UserDAO");
var MessageDAO = require("./MessageDAO");
var ProfileDAO = require("./ProfileDAO");
var FriendRequestDAO = require("./FriendRequestDAO");
var PreferenceDAO = require("./PreferenceDAO");

var CouchDbApi = function() {};

CouchDbApi.DaoManager = DaoManager;

CouchDbApi.UserDAO = UserDAO;
CouchDbApi.MessageDAO = MessageDAO;
CouchDbApi.ProfileDAO = ProfileDAO;
CouchDbApi.FriendRequestDAO = FriendRequestDAO;
CouchDbApi.PreferenceDAO = PreferenceDAO;

exports.default = CouchDbApi;
module.exports = exports.default;
