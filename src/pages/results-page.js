import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { actions, selectResults } from "../actions/brewerySlice"
import Header from "../components/header"
import Button from "../components/button"
import splitArray from "../lib/array-service"
import Nav from "../components/nav"
import Dialog from "../components/dialog"


function Results({ breweries, breweriesCache }) {
    const { searchTerm } = useParams()

    const initialPage = 1     //always the page loads retrieve the page 1 from the server
    const resultsPerPage = 30 //30 results returned by the server
    const buttonsPage = 3 //Visible pagination buttons, each page in the ui will have 10 recoords


    const results = useSelector(selectResults)
    const dispatch = useDispatch()
    const { addPageResult,addFavorite } = actions
    const [errorOpen, setErrorOpen] = useState(false)

    const [currentOffset, setCurrentOffset] = useState({
        start: 0,
        offset: 0,
        end: buttonsPage
    })

    const onClickCloseDialog = (evt)=>{
        setErrorOpen(false)
    }

    const onClickAddFavorite = async (evt)=>{
        const brewery = await breweries.getBrewery(evt.target.getAttribute("data-page"))
      
        breweriesCache.addFavorite(brewery)

        dispatch(addFavorite({
            favorites:  breweriesCache.getFavorites().results
        }))

        alert("Agregado a favoritos")
    }

    const buttons = []
    useEffect(() => {
        
        breweries.getBreweries(searchTerm, initialPage, resultsPerPage).then((data) => {

            breweriesCache.addBreweries(`breweries-${searchTerm}-${initialPage}`, data)

            dispatch(addPageResult({
                results: splitArray(3, data),
                term: searchTerm
            }))

            console.log("HI")

        }).catch((err) => {

            //retrieves the page in the cache if exist
            if (err.message === "Network Error") {
                const data = breweriesCache.getBreweries(`breweries-${searchTerm}-${initialPage}`)

                dispatch(addPageResult({
                    results: splitArray(3, data),
                    term: searchTerm
                }))

                setErrorOpen(true)
            }
        })



    }, [])

    const onClickNext = () => {

        if ((currentOffset.offset !== 0) && (((currentOffset.offset + 1) % 3) === 0)) {
            const numberOfdecrements = (currentOffset.offset + 1) / 3
            const numberToDecrement = 2
            const pageToFetch = ((currentOffset.offset + 1) - (numberOfdecrements * numberToDecrement)) + 1

            breweries.getBreweries(searchTerm, pageToFetch, resultsPerPage).then((data) => {

                breweriesCache.addBreweries(`breweries-${pageToFetch}-${searchTerm}`, data)

                dispatch(addPageResult({
                    results: splitArray(3, data),
                    term: searchTerm
                }))

            }).catch((err) => {
                if (err.message === "Network Error") {
                    const data = breweriesCache.getBreweries(`breweries-${pageToFetch}-${searchTerm}`)

                    dispatch(addPageResult({
                        results: splitArray(3, data),
                        term: searchTerm
                    }))

                    setErrorOpen(true)
                }
            })

            setCurrentOffset({
                start: currentOffset.offset + 1,
                offset: currentOffset.offset + 1,
                end: currentOffset.offset + 4
            })

            return
        }

        setCurrentOffset({
            start: currentOffset.start,
            offset: currentOffset.offset + 1,
            end: currentOffset.end
        })
    }

    const onClickBack = ()=>{

        if(currentOffset.offset === 0){
            return
        }
     
        //When the user backs to the previous 3 pages, try to retrieve the data from the network again, if is not possible, load cache if exist
        if ((((currentOffset.offset-1+1) % 3) === 0)){
            const numberOfdecrements = (currentOffset.offset) / 3
            const numberToDecrement = 2      
            const pageToFetch = (((currentOffset.offset) - (numberOfdecrements * numberToDecrement)) + 1)
            
            breweries.getBreweries(searchTerm, pageToFetch, resultsPerPage).then((data) => {

                breweriesCache.addBreweries(`breweries-${pageToFetch}-${searchTerm}`, data)

                dispatch(addPageResult({
                    results: splitArray(3, data),
                    term: searchTerm
                }))

            }).catch((err) => {
                if (err.message === "Network Error") {
                    const data = breweriesCache.getBreweries(`breweries-${pageToFetch}-${searchTerm}`)

                    dispatch(addPageResult({
                        results: splitArray(3, data),
                        term: searchTerm
                    }))

                    setErrorOpen(true)
                }
            })

            
            setCurrentOffset({
                start: currentOffset.offset - 3,
                offset: currentOffset.offset - 1,
                end: (currentOffset.offset - 3) + 3
            })

            return
        }

        setCurrentOffset({
            start: currentOffset.start,
            offset: currentOffset.offset - 1,
            end: currentOffset.end
        })
    }

    const getResultsUI = (results, index) => {
        return results[searchTerm][index].map((value, index, array) => {

            return (
                <article className="results__result" key={value.id}>
                    
                    <h1 className="results__heading">{value.name}</h1>
                    <dl>
                        <dt>Telefono</dt>
                        <dd>{value.phone}</dd>
                        <dt>Pais</dt>
                        <dd>{value.country}</dd>
                    </dl>

                    <Button onClick={onClickAddFavorite} classes="results__add-favorite" text="Agregar a favoritos" iconName="" id={value.id}/>
                </article>)
        })
    }


    for (let i = currentOffset.start; i < (currentOffset.end); i++) {

        if(i===currentOffset.offset){
            buttons.push(<Button iconName="" text={i+1} onClick={()=>console.log("Clicked")} classes="results__pageButton results__pageButton--selected" key={i} id={i}/>)
        }else{
            buttons.push(<Button iconName="" text={i+1} onClick={()=>console.log("Clicked")} classes="results__pageButton" key={i} id={i}/>)
        }
      
    }


    if ((results[searchTerm] && results[searchTerm][currentOffset.offset]) && (!errorOpen)) {
        const res = getResultsUI(results, currentOffset.offset)

        return (
            <div>
                <Nav />
                <Header />
               
                <p className="center-text">Tu termino de busqueda actual es: {searchTerm}</p>

                {res}

                <div className="results__pageBtnWrapper">
                    {((currentOffset.offset) >= 0) ? <Button onClick={onClickBack} classes="results__pageButton" text="" iconName="keyboard_arrow_left" id=""/> : null}
                    {buttons}
                    {<Button onClick={onClickNext} classes="results__pageButton" text="" iconName="keyboard_arrow_right" id=""/>}
                </div>
            </div>
        )
    }

    if ((results[searchTerm] && results[searchTerm][currentOffset.offset - 1]) && (!errorOpen)) {
        const res = getResultsUI(results, currentOffset.offset - 1)

        return (
            <div>
                <Nav />
                <Header />
                <p className="center-text">Tu termino de busqueda actual es: {searchTerm}</p>
                <p className="center-text">Cargando datos, espera...</p>
                {res}


                <div className="results__pageBtnWrapper">
                    {((currentOffset.offset + 1) >= 0) ? <Button onClick={onClickBack} classes="results__pageButton" text="" iconName="keyboard_arrow_left" id=""/> : null}
                    {buttons}
                    {<Button onClick={onClickNext} classes="results__pageButton disabled" text="" iconName="keyboard_arrow_right" id=""/>}
                    
                </div>
            </div>
        )
    }

   

    if ((results[searchTerm] && results[searchTerm][currentOffset.offset]) && (errorOpen)) {

        const res = getResultsUI(results, currentOffset.offset)

        return (
            <div>
                <Nav />
                <Header />
                <p className="center-text">Estas buscando breweries que contengan: {searchTerm}</p>

                {res}

                <div className="results__pageBtnWrapper">
                    {((currentOffset.offset) >= 0) ? <Button onClick={onClickBack} classes="results__pageButton" text="" iconName="keyboard_arrow_left" id=""/> : null}
                    {buttons}
                    {<Button onClick={onClickNext} classes="results__pageButton" text="" iconName="keyboard_arrow_right" id=""/>}
                </div>
                <Dialog isOpen={errorOpen} confirmText='Entendido' title='No tienes conexion a internet' content='Estas viendo resultados previamente cargados' closeModal={onClickCloseDialog}/>
            </div>
        )
    }

    if (errorOpen) {
        return (
            <Dialog isOpen={errorOpen} confirmText='Entendido' title='No tienes conexion a internet' content='Revisa tu conexion a internet' closeModal={onClickCloseDialog}/>
        )
    }

    return (
        <>
            <Nav/>
            <Header/>
            <p>No se encontraron resultados para el termino</p>
        </>
    )

}

export default Results