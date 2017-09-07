'use strict';

const Events = require('./Events.js');

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
     * @param {String} eventName 
     * @param {String} time 
     * @param {String} descriptor 
     * 
     * @memberOf Timeline
     */
    addEvent(eventName, time, descriptor) {
        let event = {
            id: this._generateEventId(),
            event: eventName,
            time: time,
            descriptor: descriptor
        };

        if(event === Events.HIT) {
            event.type = event.descriptor;

            delete event.descriptor;
        }

        this.events.push(event);
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
     * @todo Implement this function. 
     * 
     * The official documentation suggests limiting timelines to five minutes in length or less. 
     * Lengths greater than five minutes may not be supported.
     * 
     * @returns {Boolean}
     * 
     * @memberOf Timeline
     */
    isValid() {
        if(this.events.length == 0) {
            return false;
        }

        if(this.events[this.events.length - 1].event !== Events.SILENCE)

        return true;
    }
}

module.exports = Timeline;
