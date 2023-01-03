export function handleChangeTheme() {
    const storePrefs = localStorage.getItem('color-theme')

    if (storePrefs === 'light') {
        document.body.classList.add('light')
        document.body.style.background = '#F3F7F3'
        
    } else document.body.style.background = '#151515'

    const toggle = document.getElementById('toggle')

    toggle.addEventListener("click", () => {
        const iconMoon = document.querySelector('.ph-moon-bold')
        const displayIconMoon = window.getComputedStyle(iconMoon, null).getPropertyValue('display')

        if (displayIconMoon === 'block') {
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

