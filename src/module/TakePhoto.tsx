import { Alert, Button, notification } from "antd";
import { CheckPermission } from "../Hook/DetectBrowser";
import { useEffect, useState } from "react";

const TakePhoto = () => {
  const [api, contextHolder] = notification.useNotification();
  const [permission, setPermission] = useState(CheckPermission());

  useEffect(() => {
    if (!permission) {
      api.open({
        message: "Error Access Camera",
        description: "Your Device Not Supported Access To Camera !..",
        duration: 0,
      });
    }
  });
  const Taken = () => {
    navigator.mediaDevices.getUserMedia({
      video: {
        aspectRatio: 1.333,
        frameRate: 30,
        width: 1280,
        height: 720,
        facingMode: {
          //Use the back camera
          exact: "environment",
        },
      },
    });
  };
  return (
    <div>
      {contextHolder}
      {permission ? (
        <>
          <Button onClick={() => Taken()}>Take Picture</Button>
          <video autoPlay={true}></video>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
export default TakePhoto;
