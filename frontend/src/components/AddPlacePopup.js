import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, onAddPlace, onLoading, isOpen, onCloseOverlay }) {
   const [placeName, setPlaceName] = useState("");
   const [placeLink, setPlaceLink] = useState("");

   useEffect(() => {
      setPlaceName("");
      setPlaceLink("");
   }, [isOpen]);

   function handleSubmit(e) {
      e.preventDefault();
      onAddPlace({
         name: placeName,
         link: placeLink,
      });
   }

   function handleChangePlaceName(e) {
      setPlaceName(e.target.value);
   }

   function handleChangePlaceLink(e) {
      setPlaceLink(e.target.value);
   }

   return (

      <PopupWithForm
         name="popupNewPlace"
         title="Новое место"
         buttonText={onLoading ? `Сохранение` : `Создать`}
         onSubmit={handleSubmit}
         onClose={onClose}
         isOpen={isOpen}
         onCloseOverlay={onCloseOverlay}
      >
         <label className="popup__label">
            <input
               className="popup__input popup__input_type_image-name"
               id="nameInputNew"
               name="name"
               type="text"
               placeholder="Название"
               minLength={2}
               maxLength={30}
               value={placeName}
               onChange={handleChangePlaceName}
               required
            />
            <span className="nameInputNew-error error" />
         </label>
         <label className="popup__label">
            <input
               className="popup__input popup__input_type_image-link"
               id="linkInputNew"
               name="link"
               type="url"
               placeholder="Ссылка на картинку"
               value={placeLink}
               onChange={handleChangePlaceLink}
               required
            />
            <span className="linkInputNew-error error" />
         </label>
      </PopupWithForm>




   )
}

export default AddPlacePopup;