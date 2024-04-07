import { Chart } from "chart.js";
import Card from "../Components/Card";
import applyGlobal from "../Scripts/ApplyGlobal";
import OpacityColor from "../Components/OpacityColor";
/**
 * A card that permits to customize the font family and the font color.
 * @returns a ReactNode of the SectionFont card
 */
export default function SectionFont() {
    return <Card type={1}>
        <h3>Font family:</h3>
        <input type="text" defaultValue={Chart.defaults.font.family} onChange={(e) => { localStorage.setItem("ChartAnimate-DefaultFontFamily", e.target.value); applyGlobal(); window.chartUpdate(prevState => { return { ...prevState, date: Date.now() } }) }}></input><br></br>
        <h3>Font color:</h3>
        <OpacityColor defaultValue={Chart.defaults.color.toString()} onChange={(e) => { localStorage.setItem("ChartAnimate-DefaultColor", e); applyGlobal(); window.chartUpdate(prevState => { return { ...prevState, date: Date.now() } }) }}></OpacityColor><br></br>
        <h3></h3>
    </Card>
}