// BASEMAP LAYERS
arrayOSM = ["http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg",
            "http://otile2.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg",
            "http://otile3.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg",
            "http://otile4.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg"];

var osm_attr = new ol.Attribution({
    html: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.'
});

var slope = {
    id: "slope",
    info: "LiDAR slope derivative, 5ft",
    layer: new ol.layer.Tile({
        name: 'slope',
        source: new ol.source.TileWMS({
            url: 'http://www.legiongis.com/geoserver/wms/',
            params: {
                'LAYERS':'crawford_co:Crawford_Slope-3857',
                'TILED':false,
            },
            serverType: 'geoserver'
        }),
    })
};

var hillshade = {
    id: "hillshade",
    info: "LiDAR hillshade derivative, 5ft",
    layer: new ol.layer.Tile({
        name: 'hillshade',
        source: new ol.source.TileWMS({
            url: 'http://www.legiongis.com/geoserver/wms/',
            params: {
                'LAYERS':'crawford_co:Crawford_Hillshade-3857',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

var aerial = {
    id: "aerial",
    info: "Crawford Co Minor Civil Divisions",
    layer: new ol.layer.Tile({
        name: 'aerial',
        source: new ol.source.TileWMS({
            url: 'http://www.legiongis.com/geoserver/wms/',
            params: {
                'LAYERS':'crawford_co:crawford_muni',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

// overlays

var muni = {
    id: "muni",
    info: "Crawford Co Minor Civil Divisions",
    layer: new ol.layer.Tile({
        name: 'muni',
        source: new ol.source.TileWMS({
            url: 'http://www.legiongis.com/geoserver/wms/',
            params: {
                'LAYERS':'crawford_co:crawford_muni',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

var fracs = {
    id: "frac",
    layer: new ol.layer.Tile({
        name: 'sinks',
        source: new ol.source.TileWMS({
            url: 'http://www.legiongis.com/geoserver/wms/',
            params: {
                'LAYERS':'crawford_co:fracture_lines',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

// EMPTY LAYER
var blank = {
    id: "blank",
    layer: new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: '',
        })
    })
};

var basemaps = [slope,hillshade,aerial,blank];
var sink_layers = [frac,blank];
$('#slope').addClass('selected');
$('#frac').addClass('selected');

var collection = new ol.Collection([slope.layer,fracs.layer]);

var controls = [
    new ol.control.MousePosition({
        undefinedHTML: '<b>n/a</b>',
        projection: 'EPSG:4326',
        coordinateFormat: function(coordinate) {
            return ol.coordinate.format(coordinate, '<b>{x}, {y}</b>', 3)
        }
    }),
    new ol.control.Zoom({
        zoomInTipLabel: 'zoom in',
        zoomOutTipLabel: 'zoom out'
    }),
    new ol.control.Attribution({
        tipLabel: 'layer attributions',
    })
];

var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: collection,
    controls: controls,
    view: new ol.View({
        center: ol.proj.transform([-90.925, 43.215], 'EPSG:4326', 'EPSG:3857'),
        minZoom: 9,
        maxZoom: 19,
        zoom: 10,
    }),
    minZoomLevel: 7,
});

function selectBasemap() {
    $('.bm').on('click', function() {
        $('.bm').removeClass('selected');
        $(this).addClass('selected');
        for(var i=0; i < basemaps.length; i++) {
            var basemap = basemaps[i]
            if (basemap.id === $(this).attr('id')) {
                collection.setAt(0, basemap.layer);
                
                break;
            }
        }
        map.setLayerGroup = new ol.layer.Group(collection);
    });
};

function selectOverlay() {
    $('.hm').on('click', function() {
        $('.hm').removeClass('selected');
        $(this).addClass('selected');
        for(var i=0; i < sink_layers.length; i++) {
            var overlay = sink_layers[i]
            if (overlay.id === $(this).attr('id')) {
                collection.setAt(2, overlay.layer);
                break;
            }
        }
        map.setLayerGroup = new ol.layer.Group(collection);
    });
};

function toggleInfo() {
    $("#toggleinfo1").click(function(){
        if ($("#info1").is(":hidden")) {
            $("#info1").show();
            document.getElementById('toggleinfo1').innerHTML = "hide legend";
        } else {
            $("#info1").hide();
            document.getElementById('toggleinfo1').innerHTML = "show legend";
        }
    });
};

function toggleNote() {
    $("#toggleinfo2").click(function(){
        if ($("#info2").is(":hidden")) {
            $("#info2").show();
            document.getElementById('toggleinfo2').innerHTML = "hide basemap info";
        } else {
            $("#info2").hide();
            document.getElementById('toggleinfo2').innerHTML = "show basemap info";
        }
    });
};

$(document).ready(function() {
    toggleInfo();
    toggleNote();
    selectOverlay()
    selectBasemap();
   
}); 