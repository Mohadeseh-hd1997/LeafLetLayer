import React from "react";
import { useReactPWAInstall } from "react-pwa-install";
import myLogo from "../logo.svg";

interface InstallationPromptProps {
  children: React.ReactNode;
  enableLogging?: boolean; // Make enableLogging optional
}

function InstallationPrompt({
  children,
  enableLogging,
}: InstallationPromptProps) {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const handleClick = () => {
    pwaInstall({
      title: "Install Web App",
      logo: myLogo,
      features: (
        <ul>
          <li>Cool feature 1</li>
          <li>Cool feature 2</li>
          <li>Even cooler feature</li>
          <li>Works offline</li>
        </ul>
      ),
      description:
        "This is how the install dialog looks like. Here you can describe your app briefly.",
    })
      .then(() =>
        alert("App installed successfully or instructions for install shown")
      )
      .catch(() => alert("User opted out from installing"));
  };

  return (
    <div>
      <p>
        If your browser is supported and you haven't already installed the app,
        you should see the install button below:
      </p>
      <div>
          <button
            type="button"
            onClick={handleClick}
            style={{ marginBottom: "50px", display: "block" }}
          >
            Install app
          </button>
      </div>
 
    </div>
  );
}

export default InstallationPrompt;
