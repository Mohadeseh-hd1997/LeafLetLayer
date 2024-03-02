import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import { Link } from "react-router-dom";

export default function GeoLocation() {
  const [userLoc, setUserLoc] = useState({ latitude: null, longitude: null });
  const [permit, setPermit] = useState(false);

  // Handler for geo Function
  function errorHandler(err) {
    if (err.code === 1) {
      Alert("Error: Access is denied!");
    } else if (err.code === 2) {
      Alert("Error: Position is unavailable!");
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setPermit(true);
      },
      errorHandler // Handle errors
    );
  }, []); // Empty dependency array to run only once

  return (
    <div>
   

          <Link
            to={`https://www.google.com/maps/place/${userLoc?.latitude},${userLoc?.longitude}`}
          >
            Show My Location{userLoc.latitude && userLoc.longitude }
          </Link>
    
          {userLoc.latitude ===null && userLoc.longitude ===null &&<Alert message="please check and active your location" type="error" />}
  
      
    </div>
  );
}
