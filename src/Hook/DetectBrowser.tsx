import React, { useState, useEffect } from "react";
import platform from "platform";

export const CheckPermission= () => {
  const [permit, setPermit] = useState<{}>({
    ImageCapture: true,
    Browser: platform.name,
  });

  useEffect(() => {
    switch (platform.name) {
      case "Chrome":
        setPermit({
          ImageCapture: true,
          Browser: platform.name,
        });
        break;

      case "Edge":
        setPermit({
          ImageCapture: true,
          Browser: platform.name,
        });
        break;

      case "Firefox":
        setPermit({
          ImageCapture: false,
          Browser: platform.name,
        });
        break;

      case "Opera":
        setPermit({
          ImageCapture: true,
          Browser: platform.name,
        });
        break;

      case "Safari":
        setPermit({
          ImageCapture: true,
          Browser: platform.name,
        });
        break;

      case "Chrome Android":
        setPermit({
          ImageCapture: true,
          Browser: platform.name,
        });
        break;

      case "Firefox for Android":
        setPermit({
          ImageCapture: false,
          Browser: platform.name,
        });
        break;

      case "Opera Android":
        setPermit({
          ImageCapture: true,
          Browser: platform.name,
        });
        break;

      case "Safari on iOS":
        setPermit({
          ImageCapture: true,
          Browser: platform.name,
        });
        break;

      case "Samsung Internet":
        setPermit({
          ImageCapture: true,
          Browser: platform.name,
        });
        break;

      case "WebView Android":
        setPermit({
          ImageCapture: true,
          Browser: platform.name,
        });
        break;

      default:
        setPermit({
          ImageCapture: true,
          Browser: platform.name,
        });
        break;
    }
  }, []);

  return permit;
};
