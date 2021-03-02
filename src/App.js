import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home/Home";

function App() {
    return (
        <Router>
            {/* <Header
                token={token}
                setuserInformationsInMemoryAndInCookie={
                    setuserInformationsInMemoryAndInCookie
                }
                titleSearch={titleSearch}
                setTitleSearch={setTitleSearch}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
            /> */}
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
                <Route path="/publish">
                    <Publish baseUrl={baseUrl} token={token} />
                </Route>
                <Route path="/payment">
                    <Elements stripe={stripePromise}>
                        <Payment baseUrl={baseUrl} token={token} />
                    </Elements>
                </Route> */}
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}
export default App;
