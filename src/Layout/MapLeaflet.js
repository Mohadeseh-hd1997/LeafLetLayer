import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import { Alert } from "antd";
import logo from "../assets/logo.svg";
import 'leaflet.animatedmarker';

var locationList = [
  {
    lat: 37.7195265626227,
    lng: 46.93359375000001,
    title: "تبریز",
    Address: "تبریز خیابان اول پلاک 1",
    placeType: "h",
  },
  {
    lat: 35.60496409485937,
    lng: 51.50390625000001,
    title: "تهران",
    Address: "تهران خیابان اول پلاک 1",
    placeType: "h",
  },
  {
    lat: 32.54851512118243,
    lng: 51.767578125,
    title: "اصفهان",
    Address: "اصفهان خیابان اول پلاک 1",
    placeType: "h",
  },
  {
    lat: 35.783389740701296,
    lng: 58.88671875000001,
    title: "مشهد",
    Address: "مشهد خیابان اول پلاک 1",
    placeType: "h",
  },
  {
    lat: 34.562259303839774,
    lng: 50.93261718750001,
    title: "قم",
    Address: "قم خیابان اول پلاک 1",
    placeType: "h",
  },

  {
    lat: 29.231097541675027,
    lng: 52.99804687500001,
    title: "شیراز",
    Address: "شیراز خیابان اول پلاک 1",
    placeType: "r",
  },
  {
    lat: 27.061667813752774,
    lng: 55.98632812500001,
    title: "بندرلنگه",
    Address: "بندرلنگه خیابان اول پلاک 1",
    placeType: "r",
  },
  {
    lat: 29.11600059007595,
    lng: 60.51269531250001,
    title: "زاهدان",
    Address: "زاهدان خیابان اول پلاک 1",
    placeType: "r",
  },
  {
    lat: 31.767357597242206,
    lng: 48.91113281250001,
    title: "اهواز",
    Address: "اهواز خیابان اول پلاک 1",
    placeType: "r",
  },
  {
    lat: 31.767357597242206,
    lng: 54.31640625000001,
    title: "یزد",
    Address: "یزد خیابان اول پلاک 1",
    placeType: "r",
  },
];
const DrawMap = () => {
  useEffect(() => {
    // Initialize map only once
    const map = L.map("map").setView([35.60496409485937, 51.50390625000001], 6);
 
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);
    //var polygon = L.polyline(  locationList.map((location) => [location.lat, location.lng]), { color: "red" }).addTo(map);
    var speedList = [1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 4, 3, 2, 2, 1, 1, 1]
    // 轨迹线

  

    var routeLine = L.polyline(locationList, {
      weight: 8
    }).addTo(map);
    // 实时轨迹线
    var realRouteLine = L.polyline([], {
      weight: 8,
      color: '#FF9900'
    }).addTo(map);
  
    var carIcon = L.icon({
      iconSize: [37, 26],
      iconAnchor: [19, 13],
      iconUrl: './car.png'
    })
    // 动态marker
    var animatedMarker = L.animatedMarker(routeLine.getLatLngs(), {
      speedList: speedList,
      interval: 200, // 默认为100mm
      icon: carIcon,
      playCall: updateRealLine
    }).addTo(map)
    var newLatlngs = [routeLine.getLatLngs()[0]]
  
    // 绘制已行走轨迹线（橙色那条）
    function updateRealLine(latlng) {
      newLatlngs.push(latlng)
      realRouteLine.setLatLngs(newLatlngs)
    }
  
    let speetX = 1 // 默认速度倍数
    // 加速
    function speetUp() {
      speetX = speetX * 2
      animatedMarker.setSpeetX(speetX);
    }
  
    // 减速
    function speetDown() {
      speetX = speetX / 2
      animatedMarker.setSpeetX(speetX);
    }
  
    // 开始
    function startClick() {
      animatedMarker.start();
    }
  
    // 暂停
    function pauseClick() {
      animatedMarker.pause();
    }
  
    // 停止
    function stopClick() {
      newLatlngs = []
      animatedMarker.stop();
    }
    const editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    locationList.forEach((location) => {
      L.marker([location.lat, location.lng])
        .addTo(editableLayers)
        .bindPopup(`<b>${location.title}</b><br>${location.Address}`);
    });

    L.Marker.prototype.options.icon = L.icon({
      iconUrl: logo,
    });
    var icons = L.Icon.extend({
      options: {
        iconSize: [40, 40],
        iconAnchor: [20, 35],
      },
    });

    var IconSetting = L.Icon.extend({
      options: {
        iconSize: [40, 40],
        iconAnchor: [20, 35],
      },
    });
    var GeneralIcon = new IconSetting({ iconUrl: logo });

    for (let i = 0; i < locationList.length; i++) {
      
      L.marker([locationList[i].lat, locationList[i].lng], {
        icon: GeneralIcon,
        placeIndex: i,
      })
        .on("click", showDetails)
        .addTo(editableLayers);
    }
    function showDetails(e) {
      var placeIndex = e.target.options.placeIndex;
      alert(
        "آدرس : " +
          locationList[placeIndex].title +
          " :" +
          locationList[placeIndex].Address
      );
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

    // Clean up function to remove the map when the component unmounts
    return () => {
      map.remove();
    };
  }, []); // Run the effect only once when the component mounts

  return <div id="map" style={{ height: "800px" }}>
    <div class="menuBar">
    <input type="button" value="شروع مسیر" onclick="startClick()" />
    <input type="button" value="توقف" onclick="pauseClick()" />
    <input type="button" value="افزایش سرعت" onclick="speetUp()" />
    <input type="button" value="کاهش سرعت" onclick="speetDown()" />
    <input type="button" value="توقف" onclick="stopClick()" />
  </div>
  </div>;
};

export default DrawMap;
