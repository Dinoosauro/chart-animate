import { useEffect, useState } from "react";
import Card from "./Card";
import OpacityColor from "./OpacityColor";

interface Props {
    callback: (items: string[]) => void,
    hint: string,
    defaultValues?: string[],
    type?: "text" | "color"
}
let textStr = "";
/**
 * An UI that permits to add multiple strings
 * @param callback the function that'll be called when a value is edited. A string array of the current values is provided
 * @param hint the placeholder of the inputs
 * @param defaultValues the items to automatically add at the list
 * @param type the type of the input
 * @returns A ReactNode of a Data Container
 */
export default function DataContainer({ callback, hint, defaultValues, type = "text" }: Props) {
    let [state, updateState] = useState({
        items: defaultValues ? Array.from(defaultValues) : [] as string[],
        editDate: Date.now() // Used to force refresh, since sometimes it doesn't work
    });
    useEffect(() => {
        state.items.length !== 0 && callback(state.items);
    })
    console.log(state.items);
    return <Card type={0}>
        <div className="flex">
            {type === "text" ? <input type={type} style={{ backgroundColor: "var(--second)" }} placeholder={hint} onChange={(e) => textStr = (e.target as HTMLInputElement).value}></input> : <OpacityColor defaultValue={undefined} onChange={(e) => { textStr = e }}></OpacityColor>}
            <button style={{ marginLeft: "10px" }} onClick={() => {
                updateState(prevState => { return { items: [...prevState.items, textStr], editDate: Date.now() } });
            }}>Add</button>
        </div><br></br>
        <div className="flex autoScroll">
            {state.items.map((data, position) => <span key={`ScrollData-${hint}-${data}-${position}`} className="dataContainerTab">{data}<span style={{ marginLeft: "15px", paddingRight: "4px" }} onClick={() => {
                updateState(prevState => {
                    return {
                        items: (() => {
                            let items = prevState.items;
                            items.splice(position, 1);
                            return items;
                        })(),
                        editDate: Date.now()
                    }
                })
            }}>X</span></span>)}
        </div>
    </Card>
}