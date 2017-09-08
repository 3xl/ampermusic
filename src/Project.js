'use strict';

const Timeline = require('./Timeline.js');
const Events = require('./Events.js');

/**
 * 
 * 
 * @class Project
 */
class Project {

    /**
     * Creates an instance of Project.
     * 
     * @param {Client} client 
     * 
     * @memberOf Project
     */
    constructor(client) {
        this.title = '';
        this.client = client;
        this.timeline = new Timeline();
    }

    /**
     * Set title
     * 
     * @param {String} title 
     * 
     * @returns {this}
     * 
     * @memberOf Project
     */
    setTitle(title) {
        this.title = title;

        return this;
    }

    /**
     * Add a region event
     * 
     * @param {any} time 
     * @param {any} descriptor 
     * 
     * @returns 
     * 
     * @memberOf Project
     */
    addRegion(time, descriptor) {
        this.timeline.addEvent(Events.REGION, time, descriptor);

        return this;
    }

    /**
     * Add silence event
     * 
     * @param {Number} time 
     * 
     * @returns {this}
     * 
     * @memberOf Project
     */
    addSilence(time) {
        this.timeline.addEvent(Events.SILENCE, time);

        return this;
    }
    
    /**
     * Add an hit event
     * 
     * @param {Number} time 
     * @param {String} type 
     * 
     * @returns {this} 
     * 
     * @memberOf Project
     */
    addHit(time, type) {
        this.timeline.addEvent(Events.HIT, time, type);

        return this;
    }
    
    /**
     * Build the data model of the project and send it to the server to be processed 
     * 
     * @returns {Promise}
     * 
     * @memberOf Project
     */
    create() {
        if(this.title === '') {
            return Promise.reject(new Error('Specify an unique project title'));
        }

        if(!this.timeline.isValid()) {
            return Promise.reject(new Error('Malformed timeline.'));
        }

        let project = { 
            title: this.title,
            timeline: {
                events: this.timeline.events 
            }
        };

        return this.client.call('projects', 'POST', {
            json: project
        });
    }
}

module.exports = Project;
