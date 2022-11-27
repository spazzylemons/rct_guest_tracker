/// <reference no-default-lib="true" />
/// <reference path="/usr/share/doc/openrct2/openrct2.d.ts" />

function sendMessage(msg) {
    console.log(msg);
}

registerPlugin({
    name: 'RCT Guest Tracker',
    version: '0.1.0',
    authors: 'spazzylemons',
    type: 'intransient',
    licence: 'GPL3',

    main() {
        var currentGuest = null;
        function getGuestName() {
            return map.getEntity(currentGuest).name;
        }
        context.subscribe('guest.on_ride', function(e) {
            if (currentGuest == e.guestId) {
                sendMessage(getGuestName() + ' is on ' + map.getRide(e.rideId).name);
            }
        });
        context.subscribe('guest.left_ride', function(e) {
            if (currentGuest == e.guestId) {
                sendMessage(getGuestName() + ' has left ' + map.getRide(e.rideId).name);
            }
        });
        context.subscribe('guest.bought_item', function(e) {
            if (currentGuest == e.guestId) {
                sendMessage(getGuestName() + ' has bought ' + context.getShopItemName(e.shopItem));
            }
        });
        context.subscribe('guest.thought', function(e) {
            if (currentGuest == e.guestId) {
                sendMessage(getGuestName() + ' is thinking ' + e.thought.toString());
            }
        });
        context.subscribe('guest.generation', function(e) {
            if (currentGuest == null) {
                currentGuest = e.id;
                sendMessage('Now tracking ' + getGuestName());
            }
        });
        context.subscribe('guest.removal', function(e) {
            if (currentGuest == e.id) {
                sendMessage('No longer tracking ' + getGuestName());
                currentGuest = null;
            }
        });
    },
});
