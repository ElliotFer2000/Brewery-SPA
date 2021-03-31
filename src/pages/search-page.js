import React, { useEffect, useRef, useState } from "react"
import Nav from "../components/nav"
import Header from "../components/header"
import Button from "../components/button"
import M from "materialize-css"
import { Redirect } from "react-router"
import Dialog from "../components/dialog"



function Search({ breweries }) {
    const [valueSearch, setValueSearch] = useState('')
    const [autocomplete, setAutoComplete] = useState({})
    const [shouldRedirect, setShouldRedirect] = useState(false) //used to redirect to the results-page component
    const [shouldRedirectToInfo, setShouldRedirectToInfo] = useState(false)
    const [brewery,setBrewery] = useState('')

    const [error,setError] = useState(false)
    const inputRef = useRef()


    useEffect(() => {
        const instance = M.Autocomplete.init(inputRef.current, { data: {},onAutocomplete: onAutoComplete })

        console.log(instance)
        setAutoComplete(instance)
    }, [])

    const onSubmit = (evt) => {
        evt.preventDefault()
        if(valueSearch.trim() && (valueSearch.length===1)){
            setShouldRedirect(true)
        }else{
            setError(true)
        }
    }

    const onAutoComplete = (name)=>{
        setBrewery(name)
        setShouldRedirectToInfo(true)
    }

    const onChangeSearchTerm = async (evt) => {
        evt.preventDefault()

 
            setValueSearch(evt.target.value)

            const result = await breweries.getSuggestionNames(evt.target.value)
            const objFilter = {}

            result.forEach((value, index, array) => {
                objFilter[value.name] = null
               
            })

            autocomplete.updateData(objFilter)


    }

    if (shouldRedirect) {
        return <Redirect to={`/resultados/${valueSearch.trim().replace(" ", "_")}`} />
    }

    if(shouldRedirectToInfo){
        return <Redirect to={`/brewery-info/${brewery.trim().replace(" ", "_")}`} />
    }

    const onClickCloseDialog = (evt)=>{
        setError(false)
    }

    return (
        <>
            <Nav />
            <div className="search-page">
                <Header />
                <div className="search-page__form-wrapper">
                    <form className="search-page__form ">
                        <div className="input-field search-page__input-search">
                            <input type="text" className="autocomplete " id="brewe-input" value={valueSearch} onChange={onChangeSearchTerm} ref={inputRef} />
                            <label htmlFor="brewe-input">Nombre</label>
                            <span className="helper-text">Escribe una letra para buscar cervecerias</span>
                        </div>
                        <Button onClick={onSubmit} text={"Buscar"} iconName="search" classes="search-page__button vertical-center" />
                    </form>
                    <Dialog isOpen={error} title="Escribe una letra o elige una opcion de la lista desplegable" content="Debes escribir sola una letra" confirmText="Esta bien" closeModal={onClickCloseDialog}/>
                </div>
            </div>
        </>

    )
}

export default Search