import { Route, Routes } from "react-router-dom";

import App from "./App";
import Pricing from "./routes/Pricing";
import Home from "./routes/Home";
import About from "./routes/About";
import InvalidURL from "./routes/InvalidURL";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Events from "./routes/Events";
import Membership from "./routes/Membership";
import CreatingEvent from "./routes/CreateEvent";
import Tickets from "./routes/Tickets";
import AuthRequired from "./components/AuthRequired";
import useAuth from "./store/auth-context";
import TicketBuyProcessing from "./components/TicketBuyProcessing";

const AppNavigation = () => {
  const authCtx = useAuth();

  // either authenticaton state is not loaded
  // or it is, but we are waiting for type of user's account to load as well
  return authCtx.isLoggedIn === null ||
    (authCtx.isLoggedIn === true && authCtx.userAccountType === null) ? (
    <></>
  ) : (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="events" element={<Events />} />
        <Route element={<AuthRequired />}>
          <Route path="membership" element={<Membership />} />
          <Route element={<TicketBuyProcessing />}>
            <Route path="tickets" element={<Tickets />} />
          </Route>
          <Route path="create-event" element={<CreatingEvent />} />
        </Route>
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<InvalidURL />} />
    </Routes>
  );
};

export default AppNavigation;
