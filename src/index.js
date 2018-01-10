'use strict';

const vt = require('@mapbox/vector-tile');
const Protobuf = require('pbf');
const GeoJSONFeature = require('mapbox-gl/src/util/vectortile_to_geojson');
const featureFilter = require('./feature_filter');

module.exports = {

    querySourceFeatures(sourceID, params, map) {
        const sourceCache = map.style.sourceCaches[sourceID];

         //from: https://github.com/mapbox/mapbox-gl-js/blob/5886421ea9a5ae26797c950ec698be473fe87d17/src/source/query_features.js#L25
        const tiles = sourceCache.getRenderableIds().map((id) => {
            return sourceCache.getTileByID(id);
        });

        const result = [];

        const dataTiles = {};
        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            const dataID = tile.tileID.canonical.key;
            if (!dataTiles[dataID]) {
                dataTiles[dataID] = true;
                this.queryTile(result, params, tile);
            }
        }

        return result;

    },

    queryTile(result, params, tile) {
        //from: https://github.com/mapbox/mapbox-gl-js/blob/5886421ea9a5ae26797c950ec698be473fe87d17/src/source/tile.js#L175
        if (!tile.rawTileData) return;

        if (!tile.vtLayers) {
            tile.vtLayers = new vt.VectorTile(new Protobuf(tile.rawTileData)).layers;
        }

        const sourceLayer = params ? params.sourceLayer : '';
        const layer = tile.vtLayers._geojsonTileLayer || tile.vtLayers[sourceLayer];

        if (!layer) return;

        const filter = featureFilter(params && params.filter);
        const coord = { z: tile.tileID.overscaledZ, x: tile.tileID.canonical.x, y: tile.tileID.canonical.y };

        for (let i = 0; i < layer.length; i++) {
            const feature = layer.feature(i);
            if (filter(feature)) {
                const geojsonFeature = new GeoJSONFeature(feature, coord.z, coord.x, coord.y);
                geojsonFeature.tile = coord;
                result.push(geojsonFeature);
            }
        }
    }

};
