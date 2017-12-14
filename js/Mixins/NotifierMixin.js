export default (superclass) => class extends superclass {
    /**
     * Notify the scene of an event
     * 
     * @param {String} eventType The type of event to trigger.
     * @param {any} data The data (if any) associated with the event.
     */
    notify(eventType, data) {
        NM.notify(eventType, data);
    }
    
    /**
     * Subscribe to a list of events
     * 
     * @param {String} eventList The list of events to subscribe to as a space separated string.
     */
    bindEvents(eventList) {
        NM.listen(eventList, this.onEvent.bind(this));
    }
    
    /**
     * onEvent is called once one of the registered events has been triggered
     */
    onEvent() {

    }
};