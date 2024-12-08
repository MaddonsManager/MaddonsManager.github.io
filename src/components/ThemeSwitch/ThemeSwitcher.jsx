// components/ThemeSwitcher.tsx
import useDarkMode from 'use-dark-mode'

const ThemeSwitcher = () => {
    const darkMode = useDarkMode(false)

    return (
        <div>
            <button onClick={darkMode.disable}>Light Mode</button>
            <button onClick={darkMode.enable}>Dark Mode</button>
        </div>
    )
}

export default ThemeSwitcher
