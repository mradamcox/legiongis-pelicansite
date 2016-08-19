var fedland = new ol.layer.Tile({
    name: 'fedland',
    source: new ol.source.TileWMS({
        //url: 'http://199.184.68.66:8080/geoserver/refshp/wms/',
        url: 'http://www.adamcfcox.com:8080/geoserver/sf/wms/',
        params: {
            //'LAYERS': 'refshp:PLSS_towns',
            'LAYERS': 'sf:NHRP_bldg_pt',
            'TILED': true,
            //'singleTile':true,
            //'ratio':5
        },
        serverType: 'geoserver'   
    })
});
     
var osm = new ol.layer.Tile({
    name: 'osm',
    preload: Infinity,
    source: new ol.source.MapQuest({
        layer: 'osm',           
    })
});
        
var collection = new ol.Collection([osm,fedland]);

var controls = [
    
    new ol.control.Zoom({
        zoomInTipLabel: 'zoom in',
        zoomOutTipLabel: 'zoom out'
    }),

];

var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: collection,
    controls: controls,
    view: new ol.View({
        center: ol.proj.transform([-92.1149, 31.151589], 'EPSG:4326', 'EPSG:3857'),
        //extent: [],
        //minZoom: 9,
        maxZoom: 19,
        zoom: 8,
    }),
    minZoomLevel: 7,
});

var popup = new ol.Overlay({
    element: document.getElementById('popup'),
    stopEvent: true,
    insertFirst: false,
    
});
map.addOverlay(popup);


$(document).ready(function() {
    
    map.on('click', function(evt) {
        
        var coordinate = evt.coordinate; //Picks up click coordinates
        var viewResolution = map.getView().getResolution(); //Picks up map current resolution
        
        var url = collection.getArray()[1].getSource().getGetFeatureInfoUrl(
            coordinate,
            viewResolution,
            map.getView().getProjection(),
            {'INFO_FORMAT': 'application/json',
            'propertyName': 'resname,nris_num,address,city,state'}
        );
        reqwest({
            url: url,
            //type: 'get',
        }).then(function (data) {
            var feature = data.features[0];
            if (feature) {
                var props = feature.properties;
                var text_link = "http://pdfhost.focus.nps.gov/docs/NRHP/Text/"+props.nris_num+".pdf";
                var photo_link = "http://pdfhost.focus.nps.gov/docs/NRHP/Photos/"+props.nris_num+".pdf";
                var info = "<p><b>" + props.resname + '</b><br>refnum: '+props.nris_num+'</p><p><a href="'+text_link+'">doc</a> | <a href="'+photo_link+'">photo</a> (.pdf)</p><p>'+props.address+"<br>"+props.city+", "+props.state+"</p>";//<p>"+coords+"</p>";
                
            
                popup.setPosition(coordinate);

                var element = document.getElementById('popup');
                element.innerHTML = info;
                //$(element).popover({
                //    'placement': 'top',
                //    'animation': false,
                //    'html': true,
                //    'content': info
                //});
                //$(element).show();
                $(popup.getElement()).show();
            } else {
                $(popup.getElement()).hide();
            }
            
        });

          
    });
});