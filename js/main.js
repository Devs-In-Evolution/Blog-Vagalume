import { isFavoriteClick, notFavoritCick, renderIcon, renderIconFull, setNotFavorite } from './favorite.js'
import { scrollReveal } from './scrollreveal.js'

const cardList = document.getElementById('cards')
const filterElement = document.querySelector('.input-group input')
const cards = cardList.children

filterElement.addEventListener('input', filterCards)

fetch('https://www.vagalume.com.br/news/index.js')
  .then(response => response.json())
  .then(data => {

    data.news.forEach(object => {
      const localStorageItem = localStorage.getItem(`${object.id}`)

      if (localStorageItem === null)
        setNotFavorite(object.id)

      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const header = document.createElement('header')

      const datePost = document.createElement('h4')
      const dateFormated = dateFormat(object.inserted)
      datePost.textContent = dateFormated

      const icon = renderIcon()
      const iconFull = renderIconFull()

      isFavoriteClick(icon, object.id)
      notFavoritCick(iconFull, object.id)

      const title = document.createElement('h1')
      title.textContent = object.headline

      const subtitle = document.createElement('p')
      subtitle.textContent = object.kicker

      header.appendChild(datePost)

      if (localStorageItem === 'isFavorite')
        header.appendChild(iconFull)
      else
        header.appendChild(icon)

      card.appendChild(header)
      card.appendChild(title)
      card.appendChild(subtitle)

      cardList.appendChild(card)

      scrollReveal()
    })
  })
  .catch(error => {
    console.log(`Erro na requisição ${error}`)
  })


function filterCards() {
  if (filterElement.value) {
    for (let card of cards) {
      let title = card.querySelector('h1')
      title = title.textContent.toLowerCase()

      let filterText = filterElement.value.toLowerCase()

      if (!title.includes(filterText)) {
        card.style.display = "none"
      }
      else {
        card.style.display = "block"
      }
    }
  } else {
    for (let card of cards) {
      card.style.display = "block"
    }
  }
}

function dateFormat(date) {

  const dateOnly = date.slice(0, 10)

  const newdate = dateOnly.split("-").reverse().join("-")

  const dateFormated = new Date(newdate).toLocaleDateString('pt-BR', { year: "numeric", month: "short", day: "numeric" })

  return dateFormated
}

