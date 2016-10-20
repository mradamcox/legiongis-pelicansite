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

var sinks1_2 = {
    id: "s1-2",
    info: "sinkholes",
    layer: new ol.layer.Tile({
        name: 'sinks',
        source: new ol.source.TileWMS({
            url: 'http://www.legiongis.com/geoserver/wms/',
            params: {
                'LAYERS':'crawford_co:sink_eval',
                'TILED':true,
                'cql_filter':"depth_ft BETWEEN 1.0 AND 2.0",
            },
            serverType: 'geoserver'
        }),
    })
};

var sinks2_5 = {
    id: "s2-5",
    info: "sinkholes",
    layer: new ol.layer.Tile({
        name: 'sinks',
        source: new ol.source.TileWMS({
            url: 'http://www.legiongis.com/geoserver/wms/',
            params: {
                'LAYERS':'crawford_co:sink_eval',
                'TILED':true,
                'cql_filter':"depth_ft BETWEEN 2.0 AND 5.0",
            },
            serverType: 'geoserver'
        }),
    })
};

var sinks5 = {
    id: "s5",
    info: "sinkholes",
    layer: new ol.layer.Tile({
        name: 'sinks',
        source: new ol.source.TileWMS({
            url: 'http://www.legiongis.com/geoserver/wms/',
            params: {
                'LAYERS':'crawford_co:sink_eval',
                'TILED':true,
                'cql_filter':"depth_ft >= 5.0",
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
var sink_layers = [sinks1_2,sinks2_5,sinks5,blank];
$('#slope').addClass('selected');
$('#s5').addClass('selected');

var collection = new ol.Collection([slope.layer,muni.layer,sinks5.layer]);

var info_shown = false

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
                
                document.getElementById('layer-info').innerHTML = overlay.info
                break;
            }
        }
        map.setLayerGroup = new ol.layer.Group(collection);
    });
};

function toggleInfo() {
    var current_overlay = collection.getArray()[0];
    var info_text = current_overlay.info;
    $("#toggleinfo").click(function(){
        if ($("#layer-info").is(":hidden")) {
            $("#layer-info").show();
            document.getElementById('toggleinfo').innerHTML = "hide";
        } else {
            $("#layer-info").hide();
            document.getElementById('toggleinfo').innerHTML = "show";
        }
    });
};

function toggleNote() {
    $("#togglenote").click(function(){
        if ($("#accuracy-box").is(":hidden")) {
            $("#accuracy-box").show();
            document.getElementById('togglenote').innerHTML = "hide";
        } else {
            $("#accuracy-box").hide();
            document.getElementById('togglenote').innerHTML = "show";
        }
    });
};

$(document).ready(function() {
    document.getElementById('layer-info').innerHTML = slope.info
    toggleInfo();
    toggleNote();
    selectOverlay()
    selectBasemap();
   
}); 