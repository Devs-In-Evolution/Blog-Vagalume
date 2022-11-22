const cardList = document.getElementById('cards')
console.log(cardList)


fetch('https://www.vagalume.com.br/news/index.js')
  .then(response => response.json())
  .then(data => {

    data.news.forEach(object => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const header = document.createElement('header')

      const datePost = document.createElement('h4')
      const dateFormated = dateFormat(object.inserted)
      datePost.textContent = dateFormated

      const title = document.createElement('h1')
      title.textContent = object.headline

      const subtitle = document.createElement('p')
      subtitle.textContent = object.kicker

      header.appendChild(datePost)
      card.appendChild(header)
      card.appendChild(title)
      card.appendChild(subtitle)

      cardList.appendChild(card)
    })
  })
  .catch(error => {
    console.log('Erro na requisição ${error}')
  })

function dateFormat(date) {

  const dateOnly = date.slice(0, 10)
  console.log('dateOnly', dateOnly)

  const newdate = dateOnly.split("-").reverse().join("-")
  console.log('newdate', newdate)

  const dateFormated = new Date(newdate).toLocaleDateString('pt-BR', { year: "numeric", month: "short", day: "numeric" })

  console.log('date', date)

  return dateFormated
}
