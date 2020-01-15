const ClientBase = require("./ClientBase");

/**
 * @type {Client}
 * @extends {ClientBase}
 */
class Client extends ClientBase {
	/**
	 * Creates a new bloxy apis
	 * @param {ClientConstructorOptions} options The options used to initiate a apis with
	 */
	constructor (options) {
		super(options);

		this.loggedIn = false;
		/**
		 * The user that is authenticated (only existent when authenticated)
		 * @type {UserPartial}
		 */
		this.user = null;
		this.login = require("./src/login").bind(this, this);
		this.connect = require("./src/websocket").bind(this, this);
	}

	/**
	 * Gets group information
	 * @param {GroupIdentifier} args The group identifier
	 * @returns {Promise<Group>}
	 */
	getGroup (args) {
		return this._validate(args, () => this._validate.group.identifier).then(id => this.apis.groups.getGroupInfo(id).then(group => new this.structures.group(this, group)));
	}

	/**
	 * Gets user information
	 * @param {UserIdentifier} user The user identifier
	 * @param {boolean} isName Whether the userId provided is a username or not
	 * @returns {Promise<User>}
	 */
	async getUser (user, isName = false) {
		if (!isName) {
			user = await this._validate(user, () => this._validate.user.identifier);
		} else {
			user = await this._validate(user, joi => joi.string()).then(username => this.apis.api.getUserByUsername(username).then(n => n && n.Id));
		}
		return this.apis.other.getUser(user).then(userData => new this.structures.user(this, userData));
	}

	/**
	 * Gets a user's groups
	 * @param {UserIdentifier} user The user identifier
	 * @returns {Promise<Array<GroupUser>>}
	 */
	getUserGroups (user) {
		return this._validate(user, () => this._validate.user.identifier).then(id => this.apis.groups.getUserGroupsV2(id).then(data => data && data.data && data.data.map(group => new this.structures.group.User(this, group))));
	}
}

module.exports = Client;
