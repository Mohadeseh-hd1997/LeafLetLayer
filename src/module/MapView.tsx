import { useEffect, useState } from "react";


interface PositionUser {
  latitude: number;
  longitude: number; 
}

export default function MapView(props: PositionUser) {
  const [position, setPosition] = useState(`https://www.google.com/maps/@36.3274702,59.5417707,17.71z?entry=ttu`);

  useEffect(() => {
    setPosition(`https://www.google.com/maps/place/${props.latitude},${props.longitude}`);
  }, [props.latitude, props.longitude]);
  
  return (
    <div >
   
     <iframe
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={position}
      />
    </div>
  );
}
