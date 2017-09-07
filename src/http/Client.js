'use strict'

const qs      = require('querystring');
const request = require('request');
const rp      = require('request-promise');
const fs      = require('fs');

/**
 * Simple http client
 * 
 * @class Client
 */
class Client {

    /**
     * Creates an instance of Client.
     * 
     * @param {String} baseurl 
     * @param {Object} auth 
     * 
     * @memberOf Client
     */
    constructor(baseurl, auth) {
        this.baseurl = baseurl;
        this.auth = auth;
    }

    /**
     * Create the correct url for the api call.
     * It converts an {Object} in querystring
     * 
     * @param {String} segment 
     * @param {Object} parameters 
     * @returns 
     * 
     * @memberof Stories
     */
    buildUrl(segment, parameters) {
        return this.baseurl + segment + "?" + qs.stringify(parameters);
    }
    
    /**
     * Execute http cal
     * 
     * @param {String|Object} resource
     * @param {String} mthod - http verbs
     * @param {Object} _options - all the other options handled by request package
     * @returns 
     * 
     * @memberof Client
     */
    call(resource, method = 'GET', _options = {}) {
        let uri = this.baseurl,
            options = {};

        /**
         * Init uri variable according to resource type. If it is a {String}, the resource value is appended to the baseurl property.
         * Instead, if the method receives an {Object} the final value of uri is create using the 'buildUrl' method
         * 
         */
        if(typeof resource === 'string') {
            uri = uri + resource;
        } 
        else if(typeof resource === 'Object') {
            uri = this.buildUrl(resource.segment, resource.parameters);
        }

        // populate the base version of the options
        options = {
            uri: uri,
            method: method
        };

        // add authentication property to the options
        if(this.auth) {
            options.auth = this.auth;
        }

        // extends the properties options with the _options properties
        Object.assign(options, _options);

        return rp(options);
    }
    
    /**
     * Download a resource to a destination path
     * 
     * @param {String} uri 
     * @param {String} path 
     * @param {Object} [_options={}] 
     * 
     * @memberOf Client
     */
    download(uri, path, _options = {}) {
        // populate the base version of the options
        let options = {
            uri: uri,
            method: 'GET'
        };

        // add authentication property to the options
        if(this.auth) {
            options.auth = this.auth;
        }

        // extends the properties options with the _options properties
        Object.assign(options, _options);

        request(options)
            .on('error', (err) => {
                // handle error
            })
            .pipe(fs.createWriteStream(path));
    }
}

module.exports = Client;
