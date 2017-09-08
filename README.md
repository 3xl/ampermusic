## Ampermusic Nodejs SDK

[![Ampermusic](https://github.com/3xl/ampermusic/blob/master/ampermusic.png?raw=true)](https://www.ampermusic.com/)

The Amper Music RESTful API provides a programmatic interface for creating and downloading audio projects with the Amper Music system. It emphasizes speed and ease of use, while providing a high degree of expressiveness.

## Installation

```sh
$ npm install --save ampermusic
```

## Init

To use this package got to this [page](https://www.ampermusic.com/profile/api-access) and grab your API key
```js
const Ampermusic = require('ampermusic').Ampermusic;

// Initialize the Ampermusic class passing the apikey
let apikey = '';

let ampermusic = new Ampermusic(apikey);
```

### Get descriptors list

```js
ampermusic.getDescriptors()
    .then(descriptors => {
        console.log(descriptors);
    });
```

### Get single project

```js
let projectId = '';

ampermusic.getProject(projectId)
    .then(project => {
        console.log(project);
    });
```

### Create project

Projects are a container for system interactions. They primarily define the musical timeline.

```js
let project = ampermusic.createProjectInstance();

project
	// set project name
    .setTitle('My project')
    
    // add region at a specific time using a descriptor from the list
    .addRegion(0, 'exciting_modern_folk')
    .addRegion(10, 'ambient_uplifting_high')
    
    // start the creation process
    .create()
    
    // callback
    .then(project => {
        console.log(project);
    })
    .catch(error => {
        console.log('Error: ' + error.message);
    });
```

### Download file

```js
ampermusic.download('projectId', 'file', 'mp3');
```
