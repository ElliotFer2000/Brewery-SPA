import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { actions, selectFavorites } from "../actions/brewerySlice"
import Nav from "../components/nav"


function Favorites({ breweriesCache }) {

    const dispatch = useDispatch()
    const { addFavorite } = actions



    useEffect(() => {
        
        const fav = breweriesCache.getFavorites().results

        if (fav) {
            dispatch(addFavorite({
                favorites: fav
            }))
        }

    }, [])

    const favorites = useSelector(selectFavorites)

    if (!favorites.length) {
        return (
            <>
                <Nav />
                <div className="hero-container">
                    <h1 className="results-favorites__heading center-text">Favoritos</h1>
                    <p>No tienes ninguna cerveceria agregada de momento</p>
                </div>
            </>
        )
    }

    const res = favorites.map((value, index, array) => {
        return (
            <article className="results__result" key={value.id}>

                <h1 className="results__heading">{value.name}</h1>
                <dl>
                    <dt>Telefono</dt>
                    <dd>{value.phone}</dd>
                    <dt>Pais</dt>
                    <dd>{value.country}</dd>
                </dl>
            </article>
        )
    })


    return (
        <>
            <Nav />
            <h1 className="results-favorites__heading center-text">Favoritos</h1>
            {res}
        </>
    )
}

export default Favorites