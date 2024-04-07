import Card from "../Components/Card"
import OpacityColor from "../Components/OpacityColor"
/**
 * A card that permits changing the axis grid color
 * @returns a ReactNode of the SectionGrid tab
 */
export default function SectionGrid() {
    return <Card type={1}>
        <h3><i>X</i> grid color:</h3>
        <OpacityColor defaultValue={window.chartGet.options?.scales?.x?.grid?.color?.toString()} onChange={(e) => window.chartUpdate(prevState => { return { ...prevState, gridXColor: e } })}></OpacityColor><br></br>
        <h3><i>Y</i> grid color:</h3>
        <OpacityColor defaultValue={window.chartGet.options?.scales?.y?.grid?.color?.toString()} onChange={(e) => window.chartUpdate(prevState => { return { ...prevState, gridYColor: e } })}></OpacityColor><br></br>
    </Card>
}