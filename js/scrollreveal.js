export function scrollReveal() {
  ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 700,
  }).reveal(`
      #header,
      #posts,
      #cards,
      #cards .card`)
}


