'use strict';

const Timeline = require('./Timeline.js');

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
     * @param {any} title 
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
        this.timeline.addEvent('region', time, descriptor);

        return this;
    }

    /**
     * Add silence event
     * 
     * @param {any} time 
     * 
     * @returns 
     * 
     * @memberOf Project
     */
    addSilence(time) {
        this.timeline.addEvent('silence', time);

        return this;
    }
    
    /**
     * Add an hit event
     * 
     * @param {any} time 
     * @param {any} descriptor 
     * 
     * @returns 
     * 
     * @memberOf Project
     */
    addHit(time, descriptor) {
        this.timeline.addEvent('hit', time, descriptor);

        return this;
    }
    
    /**
     * Build the data model of the project and send it to the server to be processed 
     * 
     * @returns 
     * 
     * @memberOf Project
     */
    create() {
        if(this.title === '') {
            throw Error('Specify an unique project title');
        }

        if(this.timeline.events.length == 0) {
            throw Error('Not enough events in the project timeline.');
        }

        if(!this.timeline.isValid()) {
            throw Error('Malformed timeline.');
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