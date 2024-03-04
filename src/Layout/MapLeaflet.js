import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import "leaflet.animatedmarker/src/AnimatedMarker";
import car from "../assets/marker-icon-2x.png";
import End from "../assets/end.png";
import Start from "../assets/start.png";
import park from "../assets/Parking.png";
import { Button } from "antd";

// main function
const DrawMap = () => {
  const [map, setMap] = useState();
  const [ply, setPly] = useState();
  const [real, setReail] = useState();
  const [data, setData] = useState([]);
  var startPoint = new Array();
  var EndPoint = new Array();
  var PointList = new Array();
  var ParkList = new Array();
  const StartIcon = L.icon({
    iconUrl: Start,
    iconSize: [32, 32], // adjust the size according to your icon dimensions
  });

  const EndIcon = L.icon({
    iconUrl: End,
    iconSize: [32, 32], // adjust the size according to your icon dimensions
  });

  const ParkingIcon = L.icon({
    iconUrl: park,
    iconSize: [32, 32], // adjust the size according to your icon dimensions
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/TravelReport.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const datas = await response.json();
        var located = datas.data;
        startPoint.push(located[0].lat, located[0].lng);
        EndPoint.push(
          located[located.length - 1].lat,
          located[located.length - 1].lng
        );

        const ParkP = located.map((ln) => {
          if (ln.speed === 0) {
            ParkList.push([ln.lat, ln.lng]);
            return [ln.lat, ln.lng];
          }
            return [ln.lat, ln.lng];
          
        });
        PointList.push(ParkP);

        // Initialize map after data is fetched
        const map = L.map("map").setView(PointList[0][0], 13);
        setMap(map);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
        }).addTo(map);

        // Create polylines using PointList[0]
        setPly(
          L.polyline(PointList[0], {
            weight: 5,
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

        // Create markers for each coordinate pair in PointList[0]

        // Assuming startPoint and EndPoint are arrays containing coordinates
        L.marker([startPoint[0], startPoint[1]], {
          icon: StartIcon,
          placeIndex: [startPoint[0], startPoint[1]],
        }).addTo(editableLayers);

        L.marker([EndPoint[0], EndPoint[1]], {
          icon: EndIcon,
          placeIndex: [EndPoint[0], EndPoint[1]],
        }).addTo(editableLayers);

        // Pause location Icon
        ParkList.map((locs) => {
          console.log(locs);
          L.marker(locs, {
            icon: ParkingIcon,
            placeIndex: locs,
          }).addTo(editableLayers);
        });

        ///
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // set config animated marker after load map in last useeffect
  const [animMarket, setAnimMarket] = useState();
  const [newLatlngs, setNewLatlngs] = useState();

  useEffect(() => {
    if (ply && map) {
      setAnimMarket(
        L.animatedMarker(ply.getLatLngs(), {
          speedList: 10,
          interval: 100,
          icon: carIcon,
          playCall: updateRealLine,
        }).addTo(map)
      );
      setNewLatlngs([ply.getLatLngs()[0]]);
    }
  }, [ply, map]);
  // 2 Animation control
  var carIcon = L.icon({
    iconSize: [20, 20],
    iconUrl: car,
  });

  // realLine Path
  function updateRealLine(latlng) {
    newLatlngs.push(latlng);
    real?.setLatLngs(newLatlngs);
  }

  let speetX = 5;
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

  // stop
  const stopClick = () => {
    newLatlngs = [];
    animMarket.stop();
  };
  return (
    <div>
      {/* controller animation marker */}
      <div
        className="menuBar"
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
