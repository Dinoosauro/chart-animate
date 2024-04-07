import { useRef } from "react"

interface Props {
    defaultValue?: string | number | readonly string[] | undefined
    onChange?: (str: string) => void
}
/**
 * Create a div with both a color input and a range input, so that the user can choose a color and regulate its opacity.
 * @param defaultValue the default value. If a hexadecimal string with opacity is provided, also the opacity slider will be updated
 * @returns a ReactNode with both an input[type=color] and an input[type=range]
 */
export default function opacityColor({ defaultValue, onChange }: Props) {
    const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
    function valueHandler() {
        const updatedHex = (+(refs[1].current?.value ?? "255")).toString(16).padStart(2, "0"); // Convert the opacity into a hex string
        onChange && onChange(`${refs[0].current?.value ?? "#00000"}${updatedHex}`); // And add it to the main color hex string
    }
    return <div className="flex hcenter fullWidth">
        <input type="color" ref={refs[0]} defaultValue={defaultValue?.toString().substring(0, 7)} onChange={valueHandler}></input>
        <input type="range" style={{ width: "25%", marginLeft: "10px" }} step={1} min={0} max={255} ref={refs[1]} defaultValue={(() => {
            console.log(defaultValue);
            if (typeof defaultValue === "string" && /#([a-f0-9]{8})\b/gi.test(defaultValue)) return parseInt(`${defaultValue[7] ?? "f"}${defaultValue[8] ?? "f"}`, 16);
            return 255;
        }
        )()} onChange={valueHandler}></input>
    </div>
}