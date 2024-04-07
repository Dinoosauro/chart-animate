import { useState } from "react";
import Card from "../Components/Card";
import updateValueDataset from "../Scripts/UpdateValueDataset";
import getDefaultValueDataset from "../Scripts/GetDefaultValueDataset";
import OpacityColor from "../Components/OpacityColor";

interface Props {
    line: number
}
/**
 * The tab where the user can choose the fill options for each dataset
 * @param line the number of the current dataset
 * @returns A ReactNode of the SectionFill card
 */
export default function SectionFill({ line }: Props) {
    /**
     * Get the currently selected fill option
     * @returns An object, composed by `state` for the property that the state should have and, if applicable, the `val` (value) of the input
     */
    function getCurrentFillValue() {
        if (!window.chartGet || !window.chartGet.data?.datasets || !window.chartGet.data?.datasets[line]) return { state: "no" };
        // @ts-ignore
        const getValue = window.chartGet.data?.datasets[line].fill;
        if (getValue?.target) return getValue.target.value ? { val: getValue.target?.value, state: "axis" } : getValue.target === "origin" ? { val: 0, state: "origin" } : { val: getValue.target, state: "specific" };
        return { state: "no" };
    }
    const currentValue = getCurrentFillValue();
    let [state, updateState] = useState(currentValue.state);
    return <Card type={1}>
        <h3>Fill to:</h3>
        <select defaultValue={state} onChange={(e) => {
            updateValueDataset({
                line: line, update: {
                    fill: e.target.value === "no" ? undefined : {
                        target: e.target.value === "origin" ? "origin" : undefined
                    }
                }
            });
            updateState(e.target.value);
        }}>
            <option value={"no"}>Don't fill</option>
            <option value={"specific"}>Fill up to a specific dataset</option>
            <option value={"origin"}>Fill up to the origin</option>
            <option value={"axis"}>Fill up to a specific axis value</option>
        </select>
        {state === "specific" && <>
            <h3>Target dataset:</h3>
            <input type="number" defaultValue={getDefaultValueDataset({ line: line, prop: "fill" })?.target} onChange={(e) => updateValueDataset({
                line: line, update: {
                    fill: {
                        ...getDefaultValueDataset({ line: line, prop: "fill" }),
                        target: +e.target.value
                    }
                }
            })}></input><br></br>
        </>}
        {state === "axis" && <>
            <h3>Target axis number:</h3>
            <input type="number" defaultValue={getDefaultValueDataset({ line: line, prop: "fill" })?.target?.value} onChange={(e) => updateValueDataset({
                line: line, update: {
                    fill: {
                        ...getDefaultValueDataset({ line: line, prop: "fill" }),
                        target: {
                            value: +e.target.value
                        }
                    }
                }
            })}></input><br></br>
        </>}
        {state !== "no" && <>
            <h3>Above color:</h3>

            <OpacityColor defaultValue={getDefaultValueDataset({ line: line, prop: "fill" })?.above} onChange={(color) => updateValueDataset({
                line: line, update: {
                    fill: {
                        ...getDefaultValueDataset({ line: line, prop: "fill" }),
                        above: color
                    }
                }
            })}></OpacityColor>
            <h3>Below color:</h3>
            <OpacityColor defaultValue={getDefaultValueDataset({ line: line, prop: "fill" })?.below} onChange={(color) => updateValueDataset({
                line: line, update: {
                    fill: {
                        ...getDefaultValueDataset({ line: line, prop: "fill" }),
                        below: color
                    }
                }
            })}></OpacityColor>
        </>}
    </Card>
}