"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const CursorPage_1 = tslib_1.__importDefault(require("../asset/CursorPage"));
class UserBase {
    constructor(data, client) {
        this.getUser = () => this.client.getUser(this.id);
        this.client = client;
        this.id = data.id;
        this.name = data.name || null;
        this.membership = data.membership || null;
    }
    getStatus() {
        return this.client.apis.usersAPI.getUserStatus({
            userId: this.id
        }).then(response => response.status);
    }
    getAvatar() {
        return this.client.apis.avatarAPI.getUserAvatar({
            userId: this.id
        });
    }
    getCurrentlyWearing() {
        return this.client.apis.avatarAPI.getUserCurrentlyWearing({
            userId: this.id
        });
    }
    getOutfits(options) {
        return this.client.apis.avatarAPI.getUserOutfits(Object.assign(Object.assign({}, options), { userId: this.id }));
    }
    getBadges(options) {
        return this.client.apis.badgesAPI.getUserBadges(Object.assign(Object.assign({}, options), { userId: this.id })).then(response => new CursorPage_1.default(this.client, options || {}, response));
    }
    getBadgesAwardedDates(badges) {
        return this.client.apis.badgesAPI.getUserBadgesAwardedDates({
            badgeIds: badges,
            userId: this.id
        }).then(response => response.data.map(badgeAwarded => ({
            id: badgeAwarded.badgeId,
            awardedAt: new Date(badgeAwarded.awardedDate)
        })));
    }
    deleteBadge(badgeId) {
        return this.client.apis.badgesAPI.deleteBadgeFromUser({
            badgeId,
            userId: this.id
        });
    }
    getBundles(options) {
        return this.client.apis.catalogAPI.getUserBundles(Object.assign(Object.assign({}, options), { userId: this.id })).then(response => new CursorPage_1.default(this.client, options || {}, response));
    }
    getBundlesByType(bundleType, options) {
        return this.client.apis.catalogAPI.getUserBundlesByType(Object.assign(Object.assign({}, options), { userId: this.id, bundleType })).then(response => new CursorPage_1.default(this.client, options || {}, response));
    }
    addToChatConversation(conversationId) {
        return this.client.apis.chatAPI.addUsersToConversation({
            conversationId,
            participantUserIds: [this.id]
        });
    }
    removeFromConversation(conversationId) {
        return this.client.apis.chatAPI.removeUserFromConversation({
            conversationId,
            participantUserId: this.id
        });
    }
    startConversation() {
        return this.client.apis.chatAPI.startOneToOneConversation({
            participantUserId: this.id
        });
    }
    getTag() {
        return this.client.apis.contactsAPI.getUsersTags({
            targetUserIds: [this.id]
        }).then(response => response[0]);
    }
    setPendingTag(tag) {
        return this.client.apis.contactsAPI.setPendingUserTag({
            userTag: tag,
            targetUserId: this.id
        });
    }
    setTag(tag) {
        return this.client.apis.contactsAPI.setUserTag({
            targetUserId: this.id,
            userTag: tag
        });
    }
    removeFromTeamCreate(universeId) {
        return this.client.apis.developAPI.removeUserFromUniverseTeamCreate({
            userId: this.id,
            universeId
        });
    }
    getResellableAssetCopies(assetId) {
        return this.client.apis.economyAPI.getUserResellableAssetCopies({
            assetId,
            userId: this.id
        });
    }
    getFollowers(options) {
        return this.client.apis.friendsAPI.getUserFollowers(Object.assign(Object.assign({}, options), { userId: this.id })).then(response => new CursorPage_1.default(this.client, options || {}, response));
    }
    getFollowersCount() {
        return this.client.apis.friendsAPI.getUserFollowersCount({
            userId: this.id
        }).then(response => response.count);
    }
    getFollowing(options) {
        return this.client.apis.friendsAPI.getUserFollowing(Object.assign(Object.assign({}, options), { userId: this.id })).then(response => new CursorPage_1.default(this.client, options || {}, response));
    }
    getFollowingCount() {
        return this.client.apis.friendsAPI.getUserFollowingCount({
            userId: this.id
        }).then(response => response.count);
    }
    getFriends(options) {
        return this.client.apis.friendsAPI.getUserFriends({
            userId: this.id
        }).then(response => new CursorPage_1.default(this.client, options || {}, response));
    }
    getFriendsCount() {
        return this.client.apis.friendsAPI.getUserFriendsCount({
            userId: this.id
        });
    }
    getFriendsWithStatuses(userIds) {
        return this.client.apis.friendsAPI.getUserFriendsWithStatuses({
            userId: this.id,
            withUserIds: userIds
        });
    }
    follow() {
        return this.client.apis.friendsAPI.followUser({
            userId: this.id
        });
    }
    friend(source) {
        return this.client.apis.friendsAPI.sendFriendRequest({
            source: source || "Unknown",
            userId: this.id
        });
    }
    unFollow() {
        return this.client.apis.friendsAPI.unFollowUser({
            userId: this.id
        });
    }
    unfriend() {
        return this.client.apis.friendsAPI.unfriendUser({
            userId: this.id
        });
    }
    acceptFriendRequest() {
        return this.client.apis.friendsAPI.acceptFriendRequest({
            userId: this.id
        });
    }
    declineFriendRequest() {
        return this.client.apis.friendsAPI.declineFriendRequest({
            userId: this.id
        });
    }
    canInviteToVIPServer() {
        return this.client.apis.gamesAPI.canSelfInviteUserToVIPServer({
            userId: this.id
        }).then(response => response.canInvite);
    }
    awardBadge(badgeId, placeId) {
        return this.client.apis.generalApi.awardBadge({
            badgeId,
            placeId,
            userId: this.id
        }).then(response => response);
    }
    isFollowedByUser(userId) {
        return this.client.apis.generalApi.isUserFollowing({
            userId,
            followUserId: this.id
        });
    }
    getGroups() {
        return this.client.apis.groupsAPI.getUserGroups({
            userId: this.id
        });
    }
    ownsAsset(assetId) {
        return this.client.apis.generalApi.userOwnsAsset({
            userId: this.id,
            assetId
        });
    }
    block() {
        return this.client.apis.generalApi.blockUser({
            userId: this.id
        });
    }
    unblock() {
        return this.client.apis.generalApi.unblockUser({
            userId: this.id
        });
    }
    canManageAsset(assetId) {
        return this.client.apis.generalApi.userCanManageAsset({
            assetId,
            userId: this.id
        });
    }
    acceptJoinRequestInGroup(groupId) {
        return this.client.apis.groupsAPI.acceptJoinRequest({
            groupId,
            userId: this.id
        });
    }
    declineJoinRequestInGroup(groupId) {
        return this.client.apis.groupsAPI.declineJoinRequest({
            groupId,
            userId: this.id
        });
    }
    getJoinRequestInGroup(groupId) {
        return this.client.apis.groupsAPI.getJoinRequest({
            groupId,
            userId: this.id
        });
    }
    setGroupOwner(groupId) {
        return this.client.apis.groupsAPI.changeGroupOwner({
            groupId,
            userId: this.id
        });
    }
    kickFromGroup(groupId) {
        return this.client.apis.groupsAPI.kickMember({
            groupId: groupId,
            userId: this.id
        });
    }
    updateMemberInGroup(groupId, roleId) {
        return this.client.apis.groupsAPI.updateMember({
            groupId,
            roleId,
            userId: this.id
        });
    }
    payoutUserFromGroup(options) {
        return this.client.apis.groupsAPI.payoutMembers({
            type: options.type,
            groupId: options.groupId,
            users: [
                {
                    userId: this.id,
                    amount: options.amount
                }
            ]
        });
    }
    deleteGroupWallPosts(groupId) {
        return this.client.apis.groupsAPI.deleteUserWallPosts({
            groupId,
            userId: this.id
        });
    }
    getPrimaryGroup() {
        return this.client.apis.groupsAPI.getUserPrimaryGroup({
            userId: this.id
        });
    }
    getCollectibles(options) {
        return this.client.apis.inventoryAPI.getUserCollectibles(Object.assign(Object.assign({}, options), { userId: this.id })).then(response => new CursorPage_1.default(this.client, options || {}, response));
    }
    getItemsByTypeAndTargetId(itemType, id) {
        return this.client.apis.inventoryAPI.getUserItemsByTypeAndTargetId({
            itemType,
            itemTargetId: id,
            userId: this.id
        }).then(response => new CursorPage_1.default(this.client, {}, response));
    }
    getInventory(options) {
        return this.client.apis.inventoryAPI.getUserInventory(Object.assign(Object.assign({}, options), { userId: this.id })).then(response => new CursorPage_1.default(this.client, options, response));
    }
    getInventoryByAssetTypeId(options) {
        return this.client.apis.inventoryAPI.getUserInventoryByAssetTypeId(Object.assign(Object.assign({}, options), { userId: this.id })).then(response => new CursorPage_1.default(this.client, options, response));
    }
    getPremiumMembership() {
        return this.client.apis.premiumFeaturesAPI.validateUserMembership({
            userId: this.id
        });
    }
    upsellPremiumCheck(options) {
        return this.client.apis.premiumFeaturesAPI.premiumUpsellCheck(Object.assign(Object.assign({}, options), { userId: this.id }));
    }
    getPresence() {
        return this.client.apis.presenceAPI.getUsersPresences({
            userIds: [this.id]
        }).then(response => response.userPresences[0]);
    }
    sendMessage(options) {
        return this.client.apis.privateMessagesAPI.sendMessage(Object.assign(Object.assign({}, options), { userId: this.id }));
    }
    getFullBodyAvatarImage(options) {
        return this.client.apis.thumbnailsAPI.getUsersFullBodyAvatarImages(Object.assign(Object.assign({}, options), { userIds: [this.id] })).then(response => response.data[0]);
    }
    getAvatarBustImage(options) {
        return this.client.apis.thumbnailsAPI.getUsersAvatarBustImages(Object.assign(Object.assign({}, options), { userIds: [this.id] })).then(response => response.data[0]);
    }
    getAvatarHeadShotImage(options) {
        return this.client.apis.thumbnailsAPI.getUsersAvatarHeadShotImages(Object.assign(Object.assign({}, options), { userIds: [this.id] })).then(response => response.data[0]);
    }
    getCanTrade() {
        return this.client.apis.tradesAPI.canTradeWith({
            userId: this.id
        }).then(response => response.canTrade);
    }
    sendTrade(offers) {
        return this.client.apis.tradesAPI.sendTrade({
            offers: offers.map(offerData => ({
                userId: this.id,
                robux: offerData.robux,
                userAssetIds: offerData.userAssetIds
            }))
        });
    }
    updateTranslationGameAccess(options) {
        return this.client.apis.translationRolesAPI.updateUserAccess(Object.assign(Object.assign({}, options), { userId: this.id }));
    }
}
exports.default = UserBase;
