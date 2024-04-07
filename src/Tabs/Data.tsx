import Card from "../Components/Card"
import DataContainer from "../Components/DataContainer"
import getDefaultValueDataset from "../Scripts/GetDefaultValueDataset"
import updateValueDataset from "../Scripts/UpdateValueDataset"
interface Props {
    line: number
}
/**
 * The tab that permits to edit the values of the current dataset
 * @param line the current dataset
 * @returns A ReactNode of the SectionData card
 */
export default function SectionData({ line }: Props) {
    return <Card type={1}>
        <h3>Values of the dataset:</h3>
        <DataContainer defaultValues={getDefaultValueDataset({ line: line, prop: "data" }) as string[]} callback={(item) => updateValueDataset({ line: line, update: { data: item.map(e => +e) } })} hint="Dataset of the first line"></DataContainer>
        <h3>Line name:</h3>
        <input type="text" defaultValue={getDefaultValueDataset({ line: line, prop: "label", returnString: true }) as string} onChange={(e) => updateValueDataset({ line: line, update: { label: e.target.value } })}></input><br></br><br></br>
        <div className="flex hcenter relative">
            <input type="checkbox" className="slider" defaultChecked={window.chartStateGet?.horizontalChart} onChange={(e) => window.chartUpdate(prevState => { return { ...prevState, horizontalChart: e.target.checked } })}></input>
            <label style={{ marginLeft: "10px" }}>Use <i>Y</i> axis instead of <i>X</i> axis</label>
        </div>
    </Card>
}