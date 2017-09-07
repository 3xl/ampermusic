'use strict';

/**
 * 
 * 
 * @class Timeline
 */
class Timeline {

    /**
     * Creates an instance of Timeline.
     * 
     * 
     * @memberOf Timeline
     */
    constructor() {
        this.events = [];
    }
    
    /**
     * Add an event
     * 
     * @param {any} event 
     * @param {any} time 
     * @param {any} descriptor 
     * 
     * @memberOf Timeline
     */
    addEvent(event, time, descriptor) {
        this.events.push({
            id: this._generateEventId(),
            event: event,
            time: time,
            descriptor: descriptor
        });
    }

    /**
     * Create an identification number for the next event. Since the id must be unique,
     * this method uses the length of the events attribute for the base calculation
     * 
     * @private
     * 
     * @returns {Number}
     * 
     * @memberOf Timeline
     */
    _generateEventId() {
        return this.events.length + 1;
    }

    /**
     * We suggest limiting timelines to five minutes in length or less. Lengths greater than five minutes may not be supported.
     * 
     * @returns {Boolean}
     * 
     * @memberOf Timeline
     */
    isValid() {
        return true;
    }
}

module.exports = Timeline;