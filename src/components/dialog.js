import React from "react"
import Button from "./button"

function Dialog({ isOpen, title, content, confirmText,closeModal }) {
    return (
        <dialog open={isOpen} className="dialog">
            <h1 className="dialog__heading">{title}</h1>
            <p>{content}</p>
            
            <Button onClick={closeModal} text={confirmText} classes="dialog__button"/>
        </dialog>
    )
}

export default Dialog