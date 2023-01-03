const getInitialTheme = () => {
    if (localStorage) {
        const storePrefs = localStorage.getItem('color-theme');
        if (typeof storePrefs === 'string') {
            return storePrefs;
        }
    }

    return 'dark';
}

const theme = getInitialTheme();

if (theme === 'dark') {
    document.body.style.background = '#151515';
} else {
    document.body.classList.add("light");
    document.body.style.background = '#F3F7F3';
}

export function handleChangeTheme(toggle) {
    toggle.addEventListener("click", () => {
        if (theme === 'dark') {
            window.localStorage.setItem("color-theme", "light");
        } else {
            window.localStorage.setItem("color-theme", "dark");
        }
    
        location.reload()
    });
}

