import Card from "../Components/Card";
import getDefaultValueDataset from "../Scripts/GetDefaultValueDataset";
import updateValueDataset from "../Scripts/UpdateValueDataset";
interface Props {
    line: number
}
/**
 * A card that permits to update the line values (width, dashes etc.)
 * @param line the number of the current dataset
 * @returns a ReactNode of the SectionLine tab
 */
export default function SectionLine({ line }: Props) {
    return <Card type={1}>
        <h3>Line width:</h3>
        <input type="number" step={0.1} min={1} max={100} defaultValue={getDefaultValueDataset({ line: line, prop: "borderWidth", returnString: true }) as string} onChange={(e) => {
            updateValueDataset({
                line: line, update: {
                    borderWidth: +(e.target as HTMLInputElement).value
                }
            })
        }}></input><br></br>
        <h3>Length and spaces of dashes (separated by a comma):</h3>
        <input type="text" placeholder="For example, 1,1" defaultValue={(() => {
            const value = getDefaultValueDataset({ line: line, prop: "borderDash" });
            return Array.isArray(value) ? value.map(e => (e ?? "").toString()) : [];
        })()} onChange={(e) => updateValueDataset({ line: line, update: { borderDash: e.target.value.split(",").map(e => +e) } })}></input>
        <h3>Line drawing options:</h3>
        <select defaultValue={getDefaultValueDataset({ line: line, prop: "borderJoinStyle", returnString: true }) as string} onChange={(e) => updateValueDataset({ line: line, update: { borderJoinStyle: e.target.value as "round" | "bevel" | "miter" } })}>
            <option value={"miter"}>Default</option>
            <option value={"bevel"}>Break each line</option>
            <option value={"round"}>Add rounded corners</option>
        </select><br></br><br></br>
        <div className="flex hcenter relative">
            <input type="checkbox" defaultChecked={(getDefaultValueDataset({ line: line, prop: "spanGaps" })) === true} onChange={({ target }) => updateValueDataset({
                line: line, update: {
                    spanGaps: target.checked
                }
            })}></input>
            <label style={{ marginLeft: "10px" }}>Ignore gaps between nullish values</label>
        </div>
    </Card>
}