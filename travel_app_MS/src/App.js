import { Route, Switch } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Buses from "./pages/Buses";
import Booking from "./pages/Booking";
import Airlines from "./pages/Airlines";
import Rentals from "./pages/Rentals";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/buses">
            <Buses />
          </Route>
          <Route path="/booking">
            <Booking />
          </Route>
          <Route path="/airlines">
            <Airlines />
          </Route>
          <Route path="/rentals">
            <Rentals />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
