import React from "react"
import { Route, Switch, BrowserRouter } from "react-router-dom"
import Search from "../pages/search-page"
import Results from "../pages/results-page"
import Favorites from "../pages/results-favorites"
import BreweryInfo from "../pages/brewery-info"

function AppRouting({breweries,breweriesCache}) {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Search breweries={breweries}/>
                </Route>
                <Route exact path="/resultados/:searchTerm">
                    <Results breweries={breweries} breweriesCache={breweriesCache}/>
                </Route>
                <Route exact path="/favoritos">
                    <Favorites breweriesCache={breweriesCache} />
                </Route>
                <Route exact path="/brewery-info/:id">
                    <BreweryInfo breweries={breweries} />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouting