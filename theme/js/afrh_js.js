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
    info: "c. 1851 plat map of the George W. Riggs Property, which was purchased by the federal government in 1851 to establish the Washington branch of the U.S. Military Asylum, later to become AFRH-W; (image courtesy of the National Archives Records Administration, Washington, D.C.; filed under “Plat Map of the George W. Rigge’s [sic] Property”)",
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
    info: "<em>Map of the Environs of Washington Compiled from Boschke’s Map of the District of Columbia and from Surveys of the U.S. Coast Survey Showing the Line of the Defences of Washington as Constructed During the War from 1861 to 1865—Inclusive</em>, to accompany the report by Brevet Major General John G. Barnard, Colonel of Engineers, Late Chief Engineer of Defences, 1865 (image courtesy of the Library of Congress).",
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
    info: "<em>Topographical Sketch of the Environs of Washington, D.C.</em>, to accompany report of Nathanial Michler, topographical engineer for the Federal Army, made in compliance with Senate Resolution of 18 July 1866, Survey of Locality for Public Park of Site for a Presidential Mansion. Approved by Committee of Public Buildings and Grounds of the Senate 20 February 1867 (image courtesy of the Library of Congress).",
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
    info: "<em>Map of Soldiers’ Home near Washington, D.C.</em>, compiled from surveys by S. Bootes, Lewis Carbery, and B.D. Carpenter; American Photo-Lithograph Company, New York, 1873 (image courtesy of the Library of Congress).",
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
    info: "<em>Map of Soldiers’ Home Near Washington, D.C.</em>, J.C. Entiwistle Lithographs, 1877 (image courtesy of the Library of Congress).",
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
    info: "This is the georgeous United States Geological Survey Map, Washington West, 7-1/2 minute topographic quadrangle map (image courtesy of USGS)",
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
    info: "<em>Map of the U.S. Soldiers’ Home, Washington D.C.</em>, surveyed by 1st Lieutenant P.S. Bond, Corps of Engineers of the U.S. Army, June 1903 (image courtesy of the National Archives Records Administration, Washington, D.C.). Map notes that the survey was based on U.S. C. and G.S. topography of 1892 and boundary survey of William H. Benton in 1902, revised by E.T. Cudworth 15 December 1908, and revised 1 September 1910. This map is one of the most detailed records of physical conditions of the U.S. Soldiers’ Home during the height of its development.",
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
    info: "<em>Map of the U.S. Soldiers’ Home</em>; map notes that the topographical contour lines shown are traced from a map made from the original survey of 1892, with revisions made to show the exact locations of buildings, roads, walks, surface, and subsurface drains as they were on 20 July 1914. This map is one of the most detailed records of physical conditions of the U.S. Soldiers’ Home during the height of its development. (image courtesy of AFRH-W).",
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
    info: "Topographical survey of the U.S. Soldiers’ Home, November 1944. The map references Porter and Lockie (architect engineer), W.N. Browning (surveyor), William Karunsky (mechanical engineer), and Marshall B. Gongwer (structural engineers). This is the last detailed map and schedule of buildings from the period of significance of the AFRH-W Historic District, prior to the disposition of land and demolition of several buildings in the 1950s.",
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
    info: "U.S. Soldiers’ Home, Washington, D.C. Existing Water System, prepared by S.E. Sanders-C.H. Turrell & Associates, Land Planners, 15 May 1953 (image courtesy of AFRH-W). Map shows campus prior to disposition of eastern parcel.",
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
    info: "Topographical Map, United States Soldiers’ Home, prepared by Hayes, Seay, Mattern & Mattern, August 1967 (image courtesy of AFRH-W). Map shows campus prior to disposition of eastern parcel.",
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
    info: "United States Soldiers’ and Airmen’s Home, Schedule of Structures, November 1975 (image courtesy of AFRH-W). Map shows campus prior to disposition of eastern parcel.",
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
            document.getElementById('toggleinfo').innerHTML = "hide overlay info";
        } else {
            $("#layer-info").hide();
            document.getElementById('toggleinfo').innerHTML = "show overlay info";
        }
    });
};

function toggleNote() {
    $("#togglenote").click(function(){
        if ($("#accuracy-box").is(":hidden")) {
            $("#accuracy-box").show();
            document.getElementById('togglenote').innerHTML = "hide accuracy note";
        } else {
            $("#accuracy-box").hide();
            document.getElementById('togglenote').innerHTML = "show accuracy note";
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