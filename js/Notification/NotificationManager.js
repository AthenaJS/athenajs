var eventCallbacks = {};

/**
 * The notification manager allows different AthenaJS components to send/receive
 * events.
 */
const NotificationManager = {
    /**
     * Notifies all listeners
     *
     * @param {String} eventType The event to send.
     * @param {any} data The data to send with the event.
     *
     * Every listener that has subscribed to this event will be notified.
     */
    notify: function (eventType, data) {
        // console.log('[NM] got event', eventType, 'with data', data);
        const params = { type: eventType, data: data };

        if (eventCallbacks[eventType]) {
            eventCallbacks[eventType].forEach((callback) => callback(params));
        } else if (eventCallbacks['*']) {
            eventCallbacks['*'].forEach((callback) => callback(params));
        }
    },
    /**
     * Listen to a particular event
     *
     * @param {String} eventType The event to listen to.
     * @param {Function} method The callback function to call when notified.
     */
    listen: function (eventType, method) {
        console.log(`[NotificationManager] listening to event(s) ${eventType}`);
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