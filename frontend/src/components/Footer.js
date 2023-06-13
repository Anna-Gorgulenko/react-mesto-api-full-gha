import React from "react"

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© {new Date().getFullYear()}. Горгуленко Анна</p>{/*Добавлена функция автоматического обновления даты */}
    </footer>
  )
}

export default Footer