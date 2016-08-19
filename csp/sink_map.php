

<!DOCTYPE html>
<html land="en">
    <head>
        <title>Vernon County</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        
        <!-- OpenLayers JS -->
        <script src="http://openlayers.org/en/v3.0.0/build/ol.js" type="text/javascript"></script>
        <!-- JQuery JS -->
        <script src="http://code.jquery.com/jquery-latest.js"></script>
        
        <!-- OpenLayers CSS -->
        <link rel="stylesheet" href="http://openlayers.org/en/v3.0.0/css/ol.css" type="text/css">
        <!-- local CSS -->
        <link rel="stylesheet" href="http://www.adamcfcox.com/css/main.css" type="text/css">
        <link rel="stylesheet" href="http://www.adamcfcox.com/css/map.css" type="text/css">

    </head>
    <body>

        <div class="container">
            <div id="mapbar">
                <div>
                    <ul id="bmlist" class="bar">
                        <li id="rowhead"><b>BASEMAP</b></li>
                        <li><button id="osm" class="layer wide bm" class="selected">open street map</button></li>
                        <li><button id="imagery" class="layer wide bm">aerial imagery</button></li>
                        <li><button id="slope" class="layer wide bm">slope</button></li>
                        <li><button id="hillshade" class="layer wide bm">hillshade</button></li>
                        <li><button id="blank" class="layer bm"><em>blank</em></button></li>
                    </ul>
                </div>

                <div>
                    <ul id="overlist" class="bar">
                        <li id="rowhead"><b>OVERLAY</b></li>
                        <li><button id="sinks" class="layer hm">sinkholes</button></li>
                        <li><button id="muni" class="layer hm">WI Geologic Map</button></li>
                        <li><button id="blank" class="layer hm"><em>none</em></button></li>
                        <li><button id="temp-remove" class="layer"><em>-/+</em></button></li>
                    </ul>
                </div>
            </div>
                
            
            <div id="map" class="map"></div>
            
            <div class="info-box" id="layer-info" style="display:none; margin-top:-115px"></div>
            <div class="info-box" id="accuracy-box" style="display:none">
                <em>The process of placing historic maps on current maps ("georeferencing") is done by matching points on the historic map to corresponding points on a current basemap.  It is not an exact process.  One can see above how the historical documents fit well in some places, and badly in others.  This is to say that the historic maps are best considered as showing features in their current day </em>vicinity<em>, not their exact location.</em>
            </div>
            
            <div id="footbar">

                <b>layer info</b> <button id="toggleinfo" class="lite">show</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>accuracy note</b> <button id="togglenote" class="lite">show</button>
               
			</div>
        </div>

        <script>
        
        // BASEMAP LAYERS
        arrayOSM = ["http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg",
                    "http://otile2.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg",
                    "http://otile3.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg",
                    "http://otile4.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg"];
               
        var osm = {
            id: "osm",
            layer: new ol.layer.Tile({
                name: 'osm',
                preload: Infinity,
                source: new ol.source.MapQuest({
                    layer: 'osm',
                })
            })
        };
        
        var imagery = {
            id: "imagery",
            layer: new ol.layer.Tile({
                name: 'imagery',
                preload: Infinity,
                source: new ol.source.MapQuest({
                    layer: 'sat'
                })
            })
        };
        
        var ortho_labels = new ol.layer.Group({
            style: 'AerialWithLabels',
            layers: [
                new ol.layer.Tile({
                    name: 'imagery',
                    preload: Infinity,
                    source: new ol.source.MapQuest({
                        layer: 'sat'
                    })
                }),
                new ol.layer.Tile({
                    source: new ol.source.MapQuest({layer: 'hyb'})
                })
            ]
        });
        
        var hybrid = {
            id: "hybrid",
            layer: ortho_labels,
        };
        
        var hillshade = {
            id: "hillshade",
            layer:  new ol.layer.Tile({
            name: 'hillshade',
            source: new ol.source.TileWMS({
                    url: 'http://legiongis.com/geoserver/wms/',
                    params: {
                        'LAYERS':'crawford_co:Crawford_Hillshade-5ft',
                        'TILED':true,
                    },
                    serverType: 'geoserver'
                }),
            })
        };
        
        var slope = {
            id: "slope",
            layer:  new ol.layer.Tile({
            name: 'slope',
            source: new ol.source.TileWMS({
                    url: 'http://legiongis.com/geoserver/wms/',
                    params: {
                        'LAYERS':'crawford_co:Crawford_Slope-5ft',
                        'TILED':true,
                    },
                    serverType: 'geoserver'
                }),
            })
        };
        
        // OVERLAYS
        
        var muni = {
            id: "muni",
            info: "",
            layer: new ol.layer.Tile({
                name: 'muni',
                opacity: .65,
                source: new ol.source.TileWMS({
                    url: 'http://legiongis.com/geoserver/wms',
                    params: {
                        'LAYERS':'crawford_co:crawford_muni',
                        'TILED':true,
                    },
                }),
            })
        };
        
        var sinks = {
            id: "sinks",
            info: "Map for Kickapoo Valley Flood Control Project, 1967. Army Corps of Engineers. original source <a href='http://www.vernoncounty.org/GIS/Directory/1967COEMapsKickapooValleyFloodControlProject/' target='_blank'>here</a>.",
            layer: new ol.layer.Tile({
                name: 'coe',
                source: new ol.source.TileWMS({
                    url: 'http://legiongis.com/geoserver/wms',
                    params: {
                        'LAYERS':'crawford_co:sink_eval',
                        'TILED':true,
                    },
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
        
        var basemaps = [osm,imagery,slope,hillshade,blank];
        var overlays = [muni,sinks,blank];
        
        var collection = new ol.Collection([osm.layer,blank.layer]);
        $('#osm').addClass('selected');
        $('#blank').addClass('selected');
        
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
                center: ol.proj.transform([-90.915, 43.249], 'EPSG:4326', 'EPSG:3857'),
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
            document.getElementById('layer-info').innerHTML = blank.info
            toggleInfo();
            toggleNote();
            
            selectBasemap();
            selectOverlay();
            tempRemoveOverlay();
           
        }); 
        
        </script>        
    </body>
</html>