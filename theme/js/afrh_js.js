// BASEMAP LAYERS
arrayOSM = ["http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg",
            "http://otile2.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg",
            "http://otile3.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg",
            "http://otile4.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg"];

var osm_attr = new ol.Attribution({
    html: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.'
});

var osm = {
    id: "osm",
    layer: new ol.layer.Tile({
        name: 'osm',
        source: new ol.source.XYZ({
            //url: 'https://a.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            //url: 'https://a.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png',
            attributions: [osm_attr]
        }),
    })
};

var streetLyr = new ol.layer.Tile({
source: new ol.source.XYZ({
    //url: 'https://a.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //url: 'https://a.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png',
    attributions: [osm_attr]
}),
visible: false,
});

ortho_lyr = new ol.layer.Tile({
    name: 'ortho2013',
    source: new ol.source.XYZ({
        //attributions: [attribution],
        url: 'http://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Ortho2013_WebMercator/MapServer/tile/{z}/{y}/{x}'
    })
});

var imagery = {
    id: "imagery",
    layer: ortho_lyr,
};

var ortho_labels = new ol.layer.Group({
    style: 'AerialWithLabels',
    layers: [
        ortho_lyr,
        new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'hyb'})
        })
    ]
});

var hybrid = {
    id: "hybrid",
    layer: ortho_labels,
};

// HISTORIC MAP LAYERS

var hm1850 = {
    id: "1850",
    info: "this is the original plat of the George W. Riggs farm",
    layer: new ol.layer.Tile({
        name: '1850',
        source: new ol.source.TileWMS({
            url: 'http://52.27.146.197/geoserver/historicmaps/wms/',
            params: {
                'LAYERS':'1850_George_Riggs',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

var hm1865 = {
    id: "1865",
    info: "this is the Barnard map",
    layer: new ol.layer.Tile({
        name: '1865',
        source: new ol.source.TileWMS({
            url: 'http://52.27.146.197/geoserver/historicmaps/wms/',
            params: {
                'LAYERS':'1865_Barnard',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

var hm1866 = {
    id: "1866-67",
    info: "this is the Michler Memory map",
    layer: new ol.layer.Tile({
        name: '1866',
        source: new ol.source.TileWMS({
            url: 'http://52.27.146.197/geoserver/historicmaps/wms/',
            params: {
                'LAYERS':'1866-67_Michler_Memory',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

var hm1873 = {
    id: "1873",
    info: "this is the Bootes map",
    layer: new ol.layer.Tile({
        name: '1873',
        source: new ol.source.TileWMS({
            url: 'http://52.27.146.197/geoserver/historicmaps/wms/',
            params: {
                'LAYERS':'1873_Bootes',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

var hm1877 = {
    id: "1877",
    info: "this is the JC Entwhistle map",
    layer: new ol.layer.Tile({
        name: '1877',
        source: new ol.source.TileWMS({
            url: 'http://52.27.146.197/geoserver/historicmaps/wms/',
            params: {
                'LAYERS':'1877_JC_Entwhistle',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

var hm1892 = {
    id: "1892",
    info: "this is the beautiful USGS map",
    layer: new ol.layer.Tile({
        name: '1892',
        source: new ol.source.TileWMS({
            url: 'http://52.27.146.197/geoserver/historicmaps/wms/',
            params: {
                'LAYERS':'1892_USGS',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

var hm1903 = {
    id: "1903",
    info: "this is the Army Corps of Engineers map",
    layer: new ol.layer.Tile({
        name: '1903',
        source: new ol.source.TileWMS({
            url: 'http://52.27.146.197/geoserver/historicmaps/wms/',
            params: {
                'LAYERS':'1903_ACoE',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

var hm1914 = {
    id: "1914",
    info: "topographical map from 1914",
    layer: new ol.layer.Tile({
        name: '1914',
        source: new ol.source.TileWMS({
            url: 'http://52.27.146.197/geoserver/historicmaps/wms/',
            params: {
                'LAYERS':'1914_Topo',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

var hm1944 = {
    id: "1944",
    info: "topographical map from 1944",
    layer: new ol.layer.Tile({
        name: '1944',
        source: new ol.source.TileWMS({
            url: 'http://52.27.146.197/geoserver/historicmaps/wms/',
            params: {
                'LAYERS':'1944_Topo',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

var hm1953 = {
    id: "1953",
    info: "this is the Master Plan map",
    layer: new ol.layer.Tile({
        name: '1953',
        source: new ol.source.TileWMS({
            url: 'http://52.27.146.197/geoserver/historicmaps/wms/',
            params: {
                'LAYERS':'1953_Master_Plan',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

var hm1967 = {
    id: "1967",
    info: "topographical map from 1967",
    layer: new ol.layer.Tile({
        name: '1967',
        source: new ol.source.TileWMS({
            url: 'http://52.27.146.197/geoserver/historicmaps/wms/',
            params: {
                'LAYERS':'1967_Topo',
                'TILED':true,
            },
            serverType: 'geoserver'
        }),
    })
};

var hm1975 = {
    id: "1975",
    info: "this is a schedule of structures",
    layer: new ol.layer.Tile({
        name: '19575',
        source: new ol.source.TileWMS({
            url: 'http://52.27.146.197/geoserver/historicmaps/wms/',
            params: {
                'LAYERS':'1975_Schedule_of_Structures',
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

var basemaps = [osm,imagery,hybrid,blank];
var overlays = [hm1850,hm1865,hm1866,hm1873,hm1877,hm1892,hm1903,hm1914,hm1944,hm1953,hm1967,hm1975,blank];

var collection = new ol.Collection([osm.layer,hm1850.layer]);
$('#osm').addClass('selected');
$('#1850').addClass('selected');

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
        center: ol.proj.transform([-77.011, 38.937], 'EPSG:4326', 'EPSG:3857'),
        minZoom: 9,
        maxZoom: 19,
        zoom: 15,
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
        for(var i=0; i < overlays.length; i++) {
            var overlay = overlays[i]
            if (overlay.id === $(this).attr('id')) {
                collection.setAt(1, overlay.layer);
                
                document.getElementById('layer-info').innerHTML = overlay.info
                break;
            }
        }
        map.setLayerGroup = new ol.layer.Group(collection);
    });
};

function tempRemoveOverlay() {
    var current_overlay = collection.getArray()[1];
    $('#temp-remove').on('mousedown', function() {
        current_overlay = collection.getArray()[1];
        collection.setAt(1, blank.layer);
        map.setLayerGroup = new ol.layer.Group(collection);
    });
    $('#temp-remove').on('mouseup', function() {
        collection.setAt(1, current_overlay);
        map.setLayerGroup = new ol.layer.Group(collection);
    });
};

function toggleInfo() {
    var current_overlay = collection.getArray()[1];
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
    document.getElementById('layer-info').innerHTML = hm1850.info
    toggleInfo();
    toggleNote();
    
    selectBasemap();
    selectOverlay();
    tempRemoveOverlay();
   
}); 