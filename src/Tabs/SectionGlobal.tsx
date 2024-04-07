import Card from "../Components/Card";
import DataContainer from "../Components/DataContainer";
import { MainState } from "../Interface/Interfaces";
interface Props {
    updateState: React.Dispatch<React.SetStateAction<MainState>>
}
/**
 * A card that handles all the aspects that apply to the chart in general and not to a specific dataset. This is the case of the axis preference and the aspect ratio.
 * @param updateState the function to update the main app state
 * @returns a ReactNode of the Global Section
 */
export default function SectionGlobal({ updateState }: Props) {
    return <Card type={1}>
        <h3><i>X</i> axis names:</h3>
        <DataContainer defaultValues={(() => {
            if (!window.chartGet) return [];
            return window.chartGet.data?.labels ? window.chartGet.data?.labels.map((e: any) => e.toString()).filter(e => e !== "") : [];
        })()} callback={(item) => {
            window.chartUpdate(prevState => {
                return {
                    ...prevState,
                    labels: item
                }
            })
        }} hint="Labels of the entire graph"></DataContainer>
        <h3><i>Y</i> axis minimum value:</h3>
        <input type="number" defaultValue={window.chartGet.options?.scales?.y?.min as number} onChange={(e) => window.chartUpdate(prevState => { return { ...prevState, yBase: +e.target.value } })}></input>
        <h3><i>Y</i> axis maximum value:</h3>
        <input type="number" defaultValue={window.chartGet.options?.scales?.y?.max as number} onChange={(e) => window.chartUpdate(prevState => { return { ...prevState, yMax: +e.target.value } })}></input><br></br>
        <h3>Chart aspect ratio:</h3>
        <input type="number" defaultValue={window.chartGet.options?.aspectRatio} onChange={(e) => window.chartUpdate(prevState => { return { ...prevState, aspectRatio: +e.target.value } })}></input>
        <h3>Chart type:</h3>
        <select defaultValue={window.chartGet?.type} onChange={(e) => {
            window.chartUpdate(prevState => { return { ...prevState, type: e.target.value as "pie" } });
            updateState(prevState => { return { ...prevState, type: e.target.value, date: Date.now() } })
        }}>
            <option value={"bar"}>Bar</option>
            <option value={"doughnut"}>Donut</option>
            <option value={"pie"}>Pie</option>
            <option value={"line"}>Line</option>
            <option value={"polarArea"}>Polar area</option>
            <option value={"radar"}>Radar</option>
        </select>
    </Card>
}