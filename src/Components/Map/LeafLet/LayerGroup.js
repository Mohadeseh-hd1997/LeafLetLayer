import React, { useEffect } from "react";
import L, { Layer } from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

const DrawMap = () => {
  useEffect(() => {
    // create layers of map
    var TileLayer1 = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "Hi its Tile Layer 1",
      }
    );

    var TileLayer2 = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "Hi its Tile Layer 1",
      }
    );
    // create Map
    var map = L.map("map", {
      center: [32.287, 52.954],
      zoom: 5,
      layers: [TileLayer1, TileLayer2],
    });

    // Editable Layers

    var Map1EditableLayer = new L.featureGroup();
    map.addLayer(Map1EditableLayer);
    var MainLayers = {
      "نقشه خیابانی": TileLayer1,
      "نقشه ماهواره ": TileLayer2,
    };

    L.control
      .layers(MainLayers, {
        position: "topleft",
        collapsed: false,
      })
      .addTo(map);

    var DrawOption = {
      position: "topleft",
      draw: {
        polygon: {
          shapeoptions: {
            color: "#eee",
          },
        },
        polyline: true,
        circle: true,
        marker: true,
        rectangle: true,
      },
      edit: {
        featureGroup: MainLayers,
      },
    };

    var DrawerControl = new L.control.draw(DrawOption);
    map.addControl(DrawerControl);
    var LayerIcon = L.icon.extend({
      Options: {
        iconSize: [40, 40],
        iconAnchor: [20, 35],
      },
    });

    var Icons = new LayerIcon({
      iconUrl: "../assets/logo.svg",
    });
    // location List
    var LocationList = [
      [37.29, -108.58],
      [40.71, -108.58],
      [40.71, -102.5],
      [37.29, -102.5],
      [37, -109.05],
      [41, -109.03],
      [41, -102.05],
      [37, -102.04],
      [37.29, -108.58],
      [40.71, -108.58],
      [40.71, -102.5],
      [37.29, -102.5],
    ];

    for (let i = 0; i < LocationList.length; i++) {
      L.marker([LocationList[i].lat, LocationList.lng], {
        icon: Icons,
        placeIndex: i,
      })
        .on("click", {
          showDetails,
        })
        .addTo(MainLayers);
    }
  }, []);

  return <div id="map" style={{ height: "400px" }}></div>;
};

export default DrawMap;
