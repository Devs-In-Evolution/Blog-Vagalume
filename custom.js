const cardList = document.getElementById('cards')
const filterElement = document.querySelector('.input-group input')
const cards = cardList.children

filterElement.addEventListener('input', filterCards)

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

      const renderLink = renderLinkIcon()

      const title = document.createElement('h1')
      title.textContent = object.headline

      const subtitle = document.createElement('p')
      subtitle.textContent = object.kicker

      header.appendChild(datePost)
      header.appendChild(renderLink)
      card.appendChild(header)
      card.appendChild(title)
      card.appendChild(subtitle)

      cardList.appendChild(card)

      ScrollReveal({
        origin: 'top',
        distance: '30px',
        duration: 700,
      })
      .reveal(`
        #header,
        #posts,
        #cards,
        #cards .cards`
      )
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

function renderLinkIcon() {
  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const iconPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )

  iconSvg.setAttribute('fill', '#99B236')
  iconSvg.setAttribute('viewBox', '0 0 20 18')
  iconSvg.setAttribute('width', '20')
  iconSvg.setAttribute('height', '18')

  iconPath.setAttribute(
    'd',
    'M19.46 4.57249C19.349 4.13825 19.1778 3.7217 18.9512 3.33499C18.7336 2.9327 18.4554 2.56633 18.1262 2.24874C17.6491 1.77317 17.084 1.3949 16.4625 1.13499C15.2115 0.621549 13.8085 0.621549 12.5575 1.13499C11.97 1.38364 11.4303 1.73259 10.9625 2.16624L10.8937 2.24874L9.99999 3.14249L9.10624 2.24874L9.03749 2.16624C8.56965 1.73259 8.02994 1.38364 7.44249 1.13499C6.19145 0.621549 4.78853 0.621549 3.53749 1.13499C2.91597 1.3949 2.3509 1.77317 1.87374 2.24874C1.22111 2.88375 0.759126 3.68866 0.539991 4.57249C0.423411 5.02132 0.367911 5.48382 0.374991 5.94749C0.374991 6.38336 0.429991 6.81786 0.539991 7.23999C0.655262 7.6663 0.821459 8.07717 1.03499 8.46374C1.2656 8.86112 1.54761 9.22636 1.87374 9.54999L9.99999 17.6762L18.1262 9.54999C18.4521 9.22961 18.7312 8.86249 18.9512 8.46374C19.3978 7.70076 19.6306 6.83154 19.625 5.94749C19.6321 5.48382 19.5766 5.02131 19.46 4.57249V4.57249ZM18.085 6.81374C17.9203 7.442 17.5931 8.01582 17.1362 8.47749L9.97249 15.6275L2.80874 8.47749C2.5753 8.24239 2.37206 7.97911 2.20374 7.69374C2.04535 7.41142 1.92074 7.11144 1.83249 6.79999C1.76204 6.48858 1.72516 6.17051 1.72249 5.85124C1.72436 5.52284 1.76123 5.19557 1.83249 4.87499C1.91815 4.56264 2.04289 4.26235 2.20374 3.98124C2.36874 3.69249 2.57224 3.43124 2.80874 3.19749C3.16197 2.84899 3.57695 2.56923 4.03249 2.37249C4.95046 2.00526 5.97452 2.00526 6.89249 2.37249C7.34624 2.56086 7.75599 2.83724 8.10249 3.18374L9.97249 5.06749L11.8425 3.18374C12.1887 2.83662 12.5999 2.56098 13.0525 2.37249C13.9705 2.00526 14.9945 2.00526 15.9125 2.37249C16.3676 2.56911 16.7829 2.84961 17.1362 3.19749C17.3755 3.42436 17.5762 3.68836 17.7275 3.98124C18.046 4.54287 18.2119 5.1781 18.2087 5.82374C18.2274 6.15597 18.1997 6.48919 18.1262 6.81374H18.085V6.81374Z'
  )

  iconSvg.appendChild(iconPath)

  return iconSvg
}
