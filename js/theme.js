let theme = 'dark'
const toggle = document.getElementById('toggle')

export function handleChangeTheme() {
    const storePrefs = localStorage.getItem('color-theme')
    theme = storePrefs

    if (theme === 'light') {
        document.body.classList.add('light')
        document.body.style.background = '#F3F7F3'
        
    } else {
        document.body.style.background = '#151515'
    }

    toggle.addEventListener("click", () => {

        theme = theme === 'light' ? 'dark' : 'light'

        if (theme === 'dark') {
            document.body.classList.remove('light')
            document.body.style.background = '#151515'

            localStorage.setItem('color-theme', 'dark')

        } else {
            document.body.classList.add('light')
            document.body.style.background = '#F3F7F3'

            localStorage.setItem('color-theme', 'light')
        }
    })
}
