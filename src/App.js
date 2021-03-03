import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./containers/Home/Home";
import Header from "./components/Header/Header";
import Reviews from "./containers/Reviews/Reviews";

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                {/* <Route path="/login">
                    <Login
                        token={token}
                        setuserInformationsInMemoryAndInCookie={
                            setuserInformationsInMemoryAndInCookie
                        }
                        baseUrl={baseUrl}
                    />
                </Route>
                <Route path="/payment">
                    <Elements stripe={stripePromise}>
                        <Payment baseUrl={baseUrl} token={token} />
                    </Elements>
                </Route> */}
                <Route path="/reviews">
                    <Reviews />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}
export default App;
