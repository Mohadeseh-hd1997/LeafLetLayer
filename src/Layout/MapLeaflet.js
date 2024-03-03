import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import "leaflet.animatedmarker/src/AnimatedMarker";
import car from "../assets/car.png";
import locationList from "../Mock/LocationList";
import { Button } from "antd";
import axios from "axios";
// main function

const DrawMap = () => {
  const [map, setMap] = useState();
  const [ply, setPly] = useState();
  const [real, setReail] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('/TravelReport.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const datas = await response.json();
        setData(datas.data);
 
        var located=datas.data;
        located.forEach((loc)=>{
          data.push([loc.lat,loc.lng])
        })
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
    // 1 map controller
    // Initialize map only once
    const map = L.map("map").setView([32.287, 52.954], 6);
    setMap(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);
    //var polygon = L.polyline(  locationList.map((location) => [location.lat, location.lng]), { color: "red" }).addTo(map);
    setPly(
      L.polyline(data, {
        weight: 8,
      }).addTo(map)
    );

    setReail(
      L.polyline([], {
        weight: 8,
        color: "#FF9900",
      }).addTo(map)
    );

    const editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    data.forEach((location) => {
      L.marker([location.lat, location.lng])
        .addTo(editableLayers)
     
    });
    var icons = L.Icon.extend({
      options: {
        iconSize: [40, 40],
        iconAnchor: [20, 35],
      },
    });

    var IconSetting = L.Icon.extend({
      options: {
        iconSize: [150, 150],
        iconAnchor: [20, 35],
      },
    });
    for (let i = 0; i < data.length; i++) {
      L.marker([data[i].lat, data[i].lng], {
        //  icon: GeneralIcon,
        placeIndex: i,
      })
        
        .addTo(editableLayers);
    }
   
    const drawPluginOptions = {
      position: "topright",
      draw: {
        draw: {
          color: "pink",
        },
      },
      edit: {
        featureGroup: editableLayers,
        remove: false,
      },
    };

    const drawControl = new L.Control.Draw(drawPluginOptions);
    map.addControl(drawControl);

    map.on("draw:created", function (e) {
      const type = e.layerType,
        layer = e.layer;

      if (type === "marker") {
        layer.bindPopup("its your popup");
      }

      editableLayers.addLayer(layer);
    });

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  // set config animated marker after load map in last useeffect
  const [animMarket, setAnimMarket] = useState();
  const [newLatlngs, setNewLatlngs] = useState();

  useEffect(() => {
    if (ply && map) {
      setAnimMarket(
        L.animatedMarker(ply.getLatLngs(), {
          speedList: 5,
          interval: 2500,
          icon: carIcon,
          playCall: updateRealLine,
        }).addTo(map)
      );
      setNewLatlngs([ply.getLatLngs()[0]]);
    }
  }, [ply, map]);
  // 2 Animation controller

  var carIcon = L.icon({
    iconSize: [42, 40],
    iconAnchor: [19, 13],
    iconUrl: car,
  });

  // realLine Path
  function updateRealLine(latlng) {
    newLatlngs.push(latlng);
    real?.setLatLngs(newLatlngs);
  }

  let speetX = 1; // 默认速度倍数
  // Speed Increase
  const speetUp = () => {
    speetX = speetX * 2;
    animMarket.setSpeetX(speetX);
  };

  // Speed Decrease
  const speetDown = () => {
    speetX = speetX / 2;
    animMarket.setSpeetX(speetX);
  };

  // start
  const startClick = () => {
    animMarket.start();
  };

  // pause
  const pauseClick = () => {
    animMarket.pause();
  };

  // 停止
  const stopClick = () => {
    newLatlngs = [];
    animMarket.stop();
  };
  return (
    <div>
      {/* controller animation marker */}
      <div
        class="menuBar"
        style={{
          marginBottom: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Button onClick={() => startClick()}>"شروع"</Button>
        <Button onClick={() => pauseClick()}>"توقف"</Button>
        <Button onClick={() => speetUp()}> "افزایش سرعت" </Button>
        <Button onClick={() => speetDown()}>"کاهش سرعت" </Button>
        <Button onClick={() => stopClick()}>"توقف" </Button>
      </div>
      {/* Show */}
      <div id="map" style={{ height: "800px" }}></div>
    </div>
  );
};

export default DrawMap;
