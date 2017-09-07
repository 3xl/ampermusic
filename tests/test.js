'use strict';

const Ampermusic = require('../index.js').Ampermusic;
const Hits       = require('../index.js').Hits;

let ampermusic = new Ampermusic('apikey');

/**
 * Get the list of descriptors
 * 
 */
ampermusic.getDescriptors()
    .then(descriptors => {
        console.log(descriptors);
    });

/**
 * Create a new project
 * 
 */  
try {
    let project = ampermusic.createProjectInstance();

    project
        .addRegion(0, 'exciting_modern_folk')
        .addRegion(10, 'ambient_uplifting_high')
        .create()
        .then(project => {
            console.log(project);
        });
} catch(error) {
    console.log('Error: ' + error.message);
}

/**
 * Download video
 * 
 */
ampermusic.download('85811', './file', 'mp3');