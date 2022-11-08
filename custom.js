fetch('https://www.vagalume.com.br/news/index.js')
  .then(response => response.json())
  .then(data => {
    data.news.forEach(object => {
      console.log(object.headline)
    })
  })
  .catch(error => {
    console.log('Erro na requisição ${error}')
  })

