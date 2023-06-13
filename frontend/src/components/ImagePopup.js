import React from "react"

function ImagePopup({ card, onClose, onCloseOverlay }) {
   return (
      <div
         className={`popup popup_view-gallery ${card.link ? "popup_opened" : ""}`}
         onClick={onCloseOverlay}
      >
         <figure className="popup__gallery-container">
            <img className="popup__gallery" src={card.link} alt={card.name} />
            <figcaption className="popup__gallery-title">{card.name}</figcaption>
            <button className="popup__close" type="button" onClick={onClose} />
         </figure>
      </div>
   )
}

export default ImagePopup

