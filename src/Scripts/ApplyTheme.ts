/**
 * Change the application theme from dark to light (or viceversa)
 * @param light if the light theme should be applied
 */
export default function applyTheme(light: boolean) {
    const themes = {
        dark: {
            background: "#151515",
            first: "#313131",
            text: "#fafafa",
            second: "#4a4a4a",
            accent: "#279bc5"
        },
        light: {
            background: "#fafafa",
            text: "#151515",
            first: "#d7d7d7",
            second: "#bebebe",
            accent: "#279bc5"
        }
    }
    Object.keys(themes.dark).forEach((e) => document.body.style.setProperty(`--${e}`, themes[light ? "light" : "dark"][e as "background"]))
}