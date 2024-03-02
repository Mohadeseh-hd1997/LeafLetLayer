import { Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./Layout/Main";
import "../src/assets/styles/main.css";
import "../src/assets/styles/responsive.css";
import { sendData } from "./Hook/UsePhotos";

function App() {



  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ebf2f2",
          colorInfo: "#1d68d4",
          colorSuccess: "#3da30b",
          sizeStep: 4,
          colorLink: "#0752bf",
        },
      }}
    >
      <Main>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />

          <Route path="/" element={<Home />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/rtl" element={<Rtl />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Main>
    </ConfigProvider>
  );
}

export default App;
