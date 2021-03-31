import React from "react"
import { Link } from "react-router-dom"

function Nav(props) {
    return (
        <nav className="nav">
            <Link to="/" className="nav__link">Inicio</Link>
            <Link to="/favoritos" className="nav__link">Favoritos</Link>
        </nav>
    )
}

export default Nav