import React, { useEffect, useState } from "react";
import { Alert, Button, Space } from "antd";
import { log } from "console";


interface ChildComponentProps {
  children: React.ReactNode;
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): void;
}

export interface MainContextState {
  installprompt: BeforeInstallPromptEvent | null; // Adjust the type to BeforeInstallPromptEvent or null
}

export const Mcontext = React.createContext({
  install: null as BeforeInstallPromptEvent | null, // Adjust the type here too
});

export const MainContext = ({ children }: ChildComponentProps) => {
  const [state, setState] = useState<MainContextState>({
    installprompt: null,
  });

  const [closeAlert, setCloseAlert] = useState<Boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setState({ ...state, installprompt: e as BeforeInstallPromptEvent });
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const installHandler = () => {
    console.log(state);
    if (state.installprompt) {
      state.installprompt?.prompt();
      setCloseAlert(true);
      console.log(state.installprompt);
      
    }
  };

  return (
    <div>
      <Mcontext.Provider value={{ install: state.installprompt }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Alert
              message="Install"
              description="لطفا جهت نصب بر روی دکمه install کلیک نمایید"
              type="info"
              action={
                <Space direction="vertical">
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => installHandler()}
                  >
                    Install
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    color="red"
                    onClick={() => setCloseAlert(true)}
                  >
                    close
                  </Button>
                </Space>
              }
            />
          </Space>
        {children}
      </Mcontext.Provider>
    </div>
  );
};
