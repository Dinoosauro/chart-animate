import { Chart } from "chart.js";
/**
 * Apply global values to Chart config
 */
export default function applyGlobal() {
    const items = [localStorage.getItem("ChartAnimate-DefaultFontFamily"), localStorage.getItem("ChartAnimate-DefaultColor")]
    if (items[0]) Chart.defaults.font.family = items[0];
    if (items[1]) Chart.defaults.color = items[1];
}