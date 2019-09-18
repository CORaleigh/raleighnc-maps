import { Component, Prop, Element, h, State } from '@stencil/core';
import {loadModules } from 'esri-loader';
import { HTMLStencilElement } from '@stencil/core/internal';
@Component({
  tag: 'web-map',
  styleUrl: 'web-map.css'
})
export class WebMap {
  @Element() element: HTMLStencilElement;
  @Prop() mapId: string;
  @Prop() sceneId: string;  
  @Prop() zoom: number;
  @Prop() search: boolean = false;
  @Prop() layerlist: boolean = false;  
  @Prop() legend: boolean = false;
  @Prop() address: string;
  @Prop() navigate: boolean = true;
  @Prop() popup: boolean = true;
  @Prop() querywhere: string;
  @Prop() querylayer: string;
  @Prop() filter: boolean = false;  
  @Prop() popupdocked:boolean = false;
  @Prop() dockposition: string = 'auto';
  @Prop() highlight:boolean = true;
  @Prop() scene:boolean = false;
  @Prop() basemap:string;
  @Prop() basemapselect: boolean = false;
  @Prop() collapsewidgets: boolean = true;  
  @Prop() expandedwidget: string;
  @Prop() center: string;
  @Prop() list: boolean = false;
  @Prop() listfields: string = "";
  @Prop() listlayer: string;
  @Prop() listwhere: string = "1=1";
  @Prop() listorderby: string = "";
  mapView:any;
  @State() features:any[] = [];
  async initializeMap() {
    try {
        const [WebMap, Map, MapView, esriConfig] = await loadModules([
          'esri/WebMap', 
          'esri/Map',
          'esri/views/MapView',
          'esri/config'
        ]);
        esriConfig.portalUrl = 'https://ral.maps.arcgis.com';
        let map:any;
        if (this.mapId) {
          map = new WebMap({portalItem: {id: this.mapId}});
        } 
        else {
          map = new Map({basemap: this.basemap});
        }
        let popupconfig = {
          highlightEnabled: this.highlight,
          dockEnabled: this.popupdocked, 
          dockOptions: {
              position: this.dockposition,
              buttonEnabled: false,
              breakpoint: false
          }
      };         
        return new MapView({map: map, container: 'mapDiv', popup: popupconfig});

      } catch (error) {
        console.log('EsriLoader: ', error);
      }
  }
  async initializeScene() {
    try {
        const [WebMap, WebScene, SceneView] = await loadModules([
          'esri/WebMap', 
          'esri/WebScene',
          'esri/views/SceneView'
        ]);
        let map:any;
        if (this.mapId) {
          map = new WebMap({portalItem: {id: this.mapId}});
        } 
        if (this.sceneId) {
            map = new WebScene({portalItem: {id: this.sceneId}});
          }   
            let popupconfig = {
                highlightEnabled: this.highlight,
                dockEnabled: this.popupdocked, 
                dockOptions: {
                    position: this.dockposition,
                    buttonEnabled: false,
                    breakpoint: false
                }
            };
        return new SceneView({map: map, container: this.element, popup: popupconfig});

      } catch (error) {
        console.log('EsriLoader: ', error);
      }
  }  
  async initializeSearch(mapView) {
    try {
        const [Search] = await loadModules([
          'esri/widgets/Search'
        ]);
        let search = new Search({view: mapView, container: document.createElement("div"), popupEnabled: this.popup, resultGraphicEnabled: false});


        if (this.search) {
            mapView.ui.add({component: search, position: 'top-left'});
        }

  
        return search;

      } catch (error) {
        console.log('EsriLoader: ', error);
      }
  }  
  async initializeLayerList(mapView) {
    try {
        const [LayerList, Expand] = await loadModules([
          'esri/widgets/LayerList',
          'esri/widgets/Expand'
        ]);
        let layerlist = new LayerList({view: mapView, container: document.createElement("div")});
        if (this.collapsewidgets) {
            mapView.ui.add({component: new Expand({view: mapView, group: 'top-right', expandTooltip: 'Layers', 
            expandIconClass:"esri-icon-layers", content: layerlist.domNode, expanded: this.expandedwidget === 'layerlist' && ["xsmall"].indexOf(mapView.widthBreakpoint) === -1}), position: 'top-right'});            
        } else {
            mapView.ui.add({component: layerlist, position: 'top-right'});
        }
      } catch (error) {
        console.log('EsriLoader: ', error);
      }
  }    
  async initializeBaseMapGallery(mapView) {
    try {
        const [BasemapGallery, Expand] = await loadModules([
          'esri/widgets/BasemapGallery',
          'esri/widgets/Expand'
        ]);
        let gallery = new BasemapGallery({view: mapView, container: document.createElement("div")});

        if (this.collapsewidgets) {
            mapView.ui.add({component: new Expand({view: mapView, group: 'top-right', expandTooltip: 'Basemap Gallery', 
            expandIconClass:"esri-icon-basemap", content: gallery.domNode, expanded: this.expandedwidget === 'basemap' && ["xsmall"].indexOf(mapView.widthBreakpoint) === -1}), position: 'top-right'});            
        } else {
            mapView.ui.add({component: gallery, position: 'top-right'});
        }
      } catch (error) {
        console.log('EsriLoader: ', error);
      }
  }      
  async initializeLegend(mapView) {
    try {
        const [Legend, Expand] = await loadModules([
          'esri/widgets/Legend',
          'esri/widgets/Expand'
        ]);
        let legend = new Legend({view: mapView, container: document.createElement("div")});
        if (this.collapsewidgets) {
            mapView.ui.add({component: new Expand({view: mapView, group: 'top-right', expandTooltip: 'Legend', 
            expandIconClass:"esri-icon-layer-list", content: legend.domNode, expanded: this.expandedwidget === 'legend' && ["xsmall"].indexOf(mapView.widthBreakpoint) === -1}), position: 'top-right'});            
        } else {
            mapView.ui.add({component: legend, position: 'top-right'});
        }
      } catch (error) {
        console.log('EsriLoader: ', error);
      }
  }    
  query(mapView) {
    mapView.on('layerview-create', (layerView) => {
        if (layerView.layer.title === this.querylayer) {
            if (this.filter) {
              layerView.layer.definitionExpression = this.querywhere;
              layerView.layer.refresh();
            }
            layerView.layer.queryFeatures({where: this.querywhere, returnGeometry: true, outSpatialReference: mapView.spatialReference, outFields: ['*']}).then(result => {
              if (result.features.length) {
                let target: any = {target: result.features};
                if (this.zoom) {
                  target.zoom = this.zoom;
                }
                mapView.goTo(target, {duration:2500});
                
                if (this.popup) {
                    mapView.popup.open({features:result.features});
                }
              }
            });
        }
    });
  }      
  async createList(mapView) {
    try {
        const [Expand] = await loadModules([
          'esri/widgets/Expand'
        ]);
            //let content = '<div class="panel-side"><h3>Road Closures</h3><ul id="graphics"><li>Loading&hellip;</li></ul></div>'
            mapView.ui.add({component: new Expand({view: mapView, group: 'top-right', expandTooltip: 'Layers', 
            expandIconClass:"esri-icon-menu", content: document.getElementById("graphics"), expanded: ["xsmall"].indexOf(mapView.widthBreakpoint) === -1}), position: 'top-right'});  
            mapView.on('layerview-create', (layerView) => {
                if (layerView.layer.title === this.listlayer) {
                  debugger
                   layerView.layer.queryFeatures({where: layerView.layer.definitionExpression, returnGeometry: true, outSpatialReference: mapView.spatialReference, outFields: [this.listfields.split(',')], orderByFields:[this.listorderby]}).then(result => {
                    this.features = [...result.features];
                   });
                    
                }
            });                      
      } catch (error) {
        console.log('EsriLoader: ', error);
      }
  }      

  mapLoaded(mapView) {
   
    if (this.search || this.address) {
        this.initializeSearch(mapView).then(search => {  
            if (this.address) {
                search.search(this.address);
            }
            search.goToOverride = (view, goToParams) => {
              if (this.zoom) {
                  goToParams.target.zoom = this.zoom;
              }
              view.graphics.add({symbol: {
                type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                url: "marker.svg",
                width: "48px",
                height: "48px",
                yoffset: 4
              }, geometry: goToParams.target.target
            });
              return view.goTo(goToParams.target, goToParams.options);              
          };

   
        });
    }
    if (this.layerlist) {
        this.initializeLayerList(mapView);
    }     
    if (this.basemapselect) {
        this.initializeBaseMapGallery(mapView);
    }          
    if (this.legend) {
        this.initializeLegend(mapView);
    }           
    if (this.zoom && !this.querylayer) {
        mapView.zoom = this.zoom;
    }      



    if (!this.navigate) {
        mapView.ui.remove('zoom');
        mapView.on("drag", function(event){
          // prevents panning with the mouse drag event
          event.stopPropagation();
        });
        mapView.on("key-down", function(event){
          // prevents panning with the arrow keys
          var keyPressed = event.key;
          if(keyPressed.slice(0,5) === "Arrow"){
            event.stopPropagation();
          }
          var prohibitedKeys = [ "+", "-", "Shift", "_", "=" ];
          var keyPressed = event.key;
          if(prohibitedKeys.indexOf(keyPressed) !== -1){
            event.stopPropagation();
          }                
        });  
        mapView.on("mouse-wheel", function(event){
          event.stopPropagation();
        });  
        mapView.on("double-click", function(event){
          event.stopPropagation();
        });  
        mapView.on("double-click", ["Control"], function(event){
          event.stopPropagation();
        });      
        mapView.on("drag", ["Shift"], function(event){
          event.stopPropagation();
        });
        mapView.on("drag", ["Shift", "Control"], function(event){
          event.stopPropagation();
        });   
    } 
    mapView.when((mapView) => {
      this.mapView = mapView;         

        if (this.basemap) {
            mapView.map.basemap = this.basemap;
        }
        if (this.center) {
            let center = this.center.split(',');
            let coords = [];
            for (let i = 0;i < center.length;i++) {
                coords.push(parseFloat(center[i]))
            }
            mapView.goTo(coords);
        }          
        if (this.querylayer && this.querywhere) {
            this.query(mapView);
        }
        if (this.listlayer && this.listfields) {
            this.createList(mapView);
        }
        let camera = mapView.camera.clone();
        camera.tilt = 60;
        mapView.camera = camera;
    })
  }
  componentDidLoad() {
    this.listfields = this.listfields;
    if (!this.scene) {
        this.initializeMap().then((mapView) => {
            this.mapLoaded(mapView);
        });  
    } else {
        this.initializeScene().then((mapView) => {

            this.mapLoaded(mapView);
        });  
    }
  }

  zoomToFeature(feature) {
    this.mapView.goTo(feature.geometry)
  }
  render() {
    return (
        <div class="container">
       
      <div id="mapDiv">

</div>
<div style={{display: (this.features.length)?'block':'none'}} class="panel-side" id="graphics">
    <h3>{this.listlayer}</h3>
    <ul>
      {this.features.map((feature) => 
      <li onClick={() => this.zoomToFeature(feature)}>
        {this.listfields.split(',').map((listfield) => 
          <div>{feature.attributes[listfield]}</div>
        )}    
      </li>
      )}
    </ul>
  </div>
</div>


    );
  }  
}
