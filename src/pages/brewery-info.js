import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Dialog from "../components/dialog";
import Nav from "../components/nav";

function BreweryInfo({ breweries }) {
    const name = useParams()
    const [open, setOpen] = useState(false)
    const [response, setResponse] = useState(null)

    

    useEffect(() => {
        breweries.getBreweries(name.id,1,30).then((data) => {
            setResponse(data)
        }).catch((err) => {
            if (err.message === "Network Error") {
                setOpen(true)
            }
        })
    }, [])

    console.log(response)

    const onConfirm = () => {
        setOpen(false)
    }

    if (open) {
        return (
            <Dialog title="No tienes internet" content="Verifica tu conexion a internet" isOpen={open} confirmText="Esta bien" closeModal={onConfirm} />
        )
    } else if(response) {
        return (
            <>
                <Nav/>
                <h1 className="center-text brewery-info__title">Resultados</h1>

                {response.map((value,index,array)=>{
                    return (
                        <article className="brewery-info__result" key={value.id}>
                            <h1 className="brewery-info__heading">{value.name}</h1>
                            <p>Phone: {value.phone}</p>
                            <p>Country: {value.country}</p>
                        </article>
                    )
                })}
            </>
        )
    }

    return <p>Cargando ...</p>

}

export default BreweryInfo