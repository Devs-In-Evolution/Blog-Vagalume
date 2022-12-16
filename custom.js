const cardList = document.getElementById('cards')
const filterElement = document.querySelector('.input-group input')
const cards = cardList.children

filterElement.addEventListener('input', filterCards)

fetch('https://www.vagalume.com.br/news/index.js')
  .then(response => response.json())
  .then(data => {

    data.news.forEach(object => {
      const localStorageItemShow = localStorage.getItem(`${object.id}`)
      if (localStorageItemShow != 'true')
        localStorage.setItem(`${object.id}`, false)

      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const header = document.createElement('header')

      const datePost = document.createElement('h4')
      const dateFormated = dateFormat(object.inserted)
      datePost.textContent = dateFormated

      const renderLink = renderLinkIcon()
      const renderLinkFull = renderLinkIconFull()

      renderLink.addEventListener('click', function (event) {

        if (localStorageItemShow != 'true')
          localStorage.setItem(`${object.id}`, true)
        else
          localStorage.setItem(`${object.id}`, false)

        const localStorageItem = localStorage.getItem(`${object.id}`)
        console.log('local', localStorageItem)
        location.reload()

      }, false)


      const title = document.createElement('h1')
      title.textContent = object.headline

      const subtitle = document.createElement('p')
      subtitle.textContent = object.kicker

      header.appendChild(datePost)

      const localStorageItem = localStorage.getItem(`${object.id}`)
      console.log('localStorageItem', localStorageItem)

      if (localStorageItem == 'true')
        header.appendChild(renderLinkFull)
      else
        header.appendChild(renderLink)

      card.appendChild(header)
      card.appendChild(title)
      card.appendChild(subtitle)

      cardList.appendChild(card)
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

  iconSvg.setAttribute('fill', '#574AE8')
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

function renderLinkIconFull() {
  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const iconPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )

  iconSvg.setAttribute('fill', '#574AE8')
  iconSvg.setAttribute('viewBox', '0 0 22 20')
  iconSvg.setAttribute('width', '22')
  iconSvg.setAttribute('height', '20')

  iconPath.setAttribute(
    'd',
    'M21.6875 4.90628C21.5614 4.41282 21.3668 3.93947 21.1094 3.50003C20.8621 3.04288 20.5459 2.62655 20.1719 2.26565C19.6296 1.72523 18.9875 1.29539 18.2812 1.00003C16.8596 0.416572 15.2654 0.416572 13.8437 1.00003C13.1762 1.28259 12.5629 1.67912 12.0312 2.1719L11.9531 2.26565L10.9375 3.28128L9.92188 2.26565L9.84375 2.1719C9.31211 1.67912 8.6988 1.28259 8.03125 1.00003C6.60962 0.416572 5.01538 0.416572 3.59375 1.00003C2.88747 1.29539 2.24535 1.72523 1.70312 2.26565C0.961505 2.98726 0.436518 3.90193 0.1875 4.90628C0.0550235 5.41631 -0.00804521 5.94188 0 6.46878C0 6.96409 0.0625 7.45784 0.1875 7.93753C0.31849 8.42197 0.50735 8.88887 0.75 9.32815C1.01206 9.77973 1.33253 10.1948 1.70312 10.5625L10.9375 19.7969L20.1719 10.5625C20.5422 10.1985 20.8594 9.78128 21.1094 9.32815C21.6169 8.46113 21.8813 7.47338 21.875 6.46878C21.8831 5.94188 21.82 5.4163 21.6875 4.90628ZM20.4375 6.93756C22 4.39068 16.9567 0.47538 16.4375 1L14.5 2L10.3479 4.90628H11.4646C17.4803 -1.10935 15.1288 3.60556 14.9375 3.28128C15.9375 2.40628 14.1003 3.35392 14 3C13.9199 2.64612 15.9406 4.80037 15.9375 4.43756C15.9397 4.06437 16.919 2.8643 17 2.5C17.0973 2.14506 10.7031 3.59375 4 4.5C4 4.5 5.1688 6.59378 5.43755 6.32815C5.83895 5.93213 7.48234 8.22357 8 8C9.04315 7.58269 5.3944 4.48897 6.43755 4.90628C6.95317 5.12034 7.0438 4.04381 7.43755 4.43756L10.9062 5.46878L15 3C15.3935 2.60555 7.48567 9.71419 8 9.5C9.04315 9.08269 16.6131 1.98897 17.6562 2.40628C18.1734 2.62971 18.6453 2.94846 19.0469 3.34378C19.3187 3.60159 19.5469 3.90159 19.7188 4.2344C20.0807 4.87262 20.2692 5.59447 20.2656 6.32815C20.2869 6.70569 20.3491 6.90141 20.2656 7.27022L20.4375 6.93756Z'
  )

  iconSvg.appendChild(iconPath)

  return iconSvg
}

