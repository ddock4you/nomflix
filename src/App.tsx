import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import TV from "./routers/TV";
import Search from "./routers/Search";
import Home from "./routers/Home";

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path={["/nomflix/tv", "/nomflix/tvs/:id"]}>
                    <TV />
                </Route>
                <Route path={["/nomflix/search", "/nomflix/search/:id"]}>
                    <Search />
                </Route>
                <Route path={["/nomflix", "/nomflix/movies/:id"]}>
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
