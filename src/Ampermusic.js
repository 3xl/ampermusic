'use strict';

const Client  = require('./http/Client.js');
const Project = require('./Project.js');

/**
 * 
 * 
 * @class Ampermusic
 */
class Ampermusic {

    /**
     * Creates an instance of Ampermusic.
     * 
     * @param {String} apikey - go to https://www.ampermusic.com/profile/api-access to get a correct apikey
     * 
     * @memberOf Ampermusic
     */
    constructor(apikey) {
        this.client = new Client('https://jimmy.ampermusic.com/v1/', { bearer: apikey });
    }

    /**
     * Get a new instance of Project object
     * 
     * @returns 
     * 
     * @memberOf Ampermusic
     */
    createProjectInstance() {
        return new Project(this.client);
    }

    /**
     * Get the list of descriptios
     * 
     * @returns {Promise}
     * 
     * @memberOf Ampermusic
     */
    getDescriptors() {
        return this.client.call('data/descriptors', 'GET');
    }

    /**
     * Get a project
     * 
     * @param {String} id
     * 
     * @returns {Promise}
     * 
     * @memberOf Ampermusic
     */
    getProject(id) {
        return this.client.call('projects/' + id, 'GET');
    }

    /**
     * Download the audio file of a project
     * 
     * @param {String} id - the id of the project
     * @param {String} destination - path to the file
     * @param {String} format - the accepted format are mp3 and wav
     * 
     * @memberOf Ampermusic
     */
    download(id, destination = './file', format = 'mp3') {
        this.getProject(id)
            .then(project => {
                project = JSON.parse(project);

                let file = project.files.filter(file => file.content_type == 'audio/' + format)[0];

                this.client.download(file.download_url, destination + '.' + format);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

module.exports = Ampermusic;
