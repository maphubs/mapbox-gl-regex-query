# Mapbox Regex Query

Query source data using a regex filter

This is an unofficial plugin, and is not affliated with Mapbox. 😇

🚧Tested with v0.37.0, this is not using the public API and will likely break between versions🚧

This is my temporary workaround until cross-platform regex is supported directly in mapbox-gl, I recommend helping with that directly if you can, see: https://github.com/mapbox/mapbox-gl-js/issues/4089 

## Installation

```sh
npm install mapbox-gl-regex-query
``` 
or 
```sh
yarn add mapbox-gl-regex-query
```

## Usage

```js
require('mapbox-gl-regex-search').querySourceFeatures(sourceID, filter, map);
```

Use `~=` to active the regex filter. It also works in `any` and `all`  filters.

Example: 

```js
var MapboxGLRegexSearch = require('mapbox-gl-regex-search');
var map = new mapboxgl.Map({
  /* ... */
});

var onSearchButtonClick = function(){
    var results = MapboxGLRegexSearch.querySourceFeatures('diners-drive-ins-and-dives',
    {
      sourceLayer: 'locations',
      filter: ['all',
        ['==', 'state', 'VA'],
        ['~=', 'name', '/.*burgers.*/g']
      ]
    },
    map);
}

```

## Development

Build: `npm run build-dev`

## License

BSD-3-Clause

## Attributions

Portions adapted directly from the mapbox-gl-js, attributions are in the code
