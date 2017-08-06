
/*jshint devel: true, bitwise: false*/
var eventCallbacks = {};

const NotificationManager = {
    notify: function (eventType, data) {
        // console.log('[NM] got event', eventType, 'with data', data);
        const params = { type: eventType, data: data };

        if (eventCallbacks[eventType]) {
            eventCallbacks[eventType].forEach((callback) => callback(params));
        } else if (eventCallbacks['*']) {
            eventCallbacks['*'].forEach((callback) => callback(params));
        }
    },
    listen: function (eventType, method) {
        console.log('[NM] listening to event', eventType);
        let eventList = eventType.replace(/\s+/g, ' ').split(' ');

        eventList.forEach((eventType) => {
            if (!eventCallbacks[eventType]) {
                eventCallbacks[eventType] = [];
            }

            eventCallbacks[eventType].push(method);
        });
    }
};

window.NM = NotificationManager;

export default NotificationManager;