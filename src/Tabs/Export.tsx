import { createRoot } from "react-dom/client";
import Card from "../Components/Card";
import Download from "../Components/Download";
import { CanvasState, ExportGlobal } from "../Interface/Interfaces";
import { ChartConfiguration } from "chart.js";
import applyGlobal from "../Scripts/ApplyGlobal";
import applyTheme from "../Scripts/ApplyTheme";

/**
 * A card that permits the exportation of Chart/settings elements
 * @returns A ReactNode of the SectionExport card
 */
export default function SectionExport() {
    return <div className="optionButtonAdapt"><Card type={1}>
        <Card type={0}>
            <h3>Export animation as PNG:</h3>
            <h4>Exportation width (written in CSS):</h4>
            <input type="text" style={{ backgroundColor: "var(--second)" }} onChange={(e) => {
                // Update the width and height CSS properties, that are used by the canvas container div when exporting
                document.body.style.setProperty("--width", e.target.value);
                document.body.style.setProperty("--height", (+e.target.value / window.chartStateGet.aspectRatio).toString());
            }} defaultValue={getComputedStyle(document.body).getPropertyValue("--width")}></input><br></br><br></br>
            <button onClick={async () => {
                try { // Try using the File System API 
                    const handle = await window.showDirectoryPicker({ id: "ChartAnimate-SaveFile", mode: "readwrite" });
                    window.chartUpdate(prevState => { return { ...prevState, savePng: true, handle: handle } });
                } catch (ex) { // Use the normal zip download
                    console.warn(ex);
                    window.chartUpdate(prevState => { return { ...prevState, savePng: true } });
                }
            }}>Start exporting the animation</button>
        </Card><br></br>
        <Card type={0}>
            <h3>Export settigns:</h3>
            <button onClick={() => { // Export the current Chart object as a JSON file
                let div = document.createElement("div");
                createRoot(div).render(<Download close={() => div.remove()} a={<a href={URL.createObjectURL(new Blob([JSON.stringify(window.chartGet)]))} download={`Chart-${Date.now()}.json`}></a>}></Download>);
                setTimeout(() => div.querySelector("a")?.click(), 150);
            }}>Export Chart.JS configuration</button>

            <button onClick={() => { // Export the global values as a JSON file
                let div = document.createElement("div");
                createRoot(div).render(<Download close={() => div.remove()} a={<a download={"ChartAnimate-GlobalOptions.json"} href={URL.createObjectURL(new Blob([JSON.stringify({
                    font: localStorage.getItem("ChartAnimate-DefaultFontFamily"),
                    color: localStorage.getItem("ChartAnimate-DefaultColor"),
                    theme: localStorage.getItem("ChartAnimate-Theme"),
                    delay: localStorage.getItem("ChartAnimate-DefaultDelay")
                } as ExportGlobal)]))}>Force download</a>}></Download>);
                setTimeout(() => div.querySelector("a")?.click(), 150);
                document.body.append(div);
            }}>Export chart-animate global values</button>
        </Card><br></br>
        <Card type={0}>
            <h3>Import settings:</h3>
            <button onClick={() => { // Get a JSON file from the user
                let input = document.createElement("input");
                input.type = "file";
                input.accept = "application/json"
                input.onchange = async () => {
                    if (input.files) {
                        const json = JSON.parse(await input.files[0].text()) as ChartConfiguration;
                        const valueMap = new Map<keyof CanvasState, any>([ // A map of all the items that can be edited from the State.
                            ["type", json.type],
                            ["labels", json.data.labels],
                            ["datasets", json.data.datasets],
                            ["aspectRatio", json.options?.aspectRatio],
                            ["horizontalChart", json.options?.indexAxis === "y"],
                            // @ts-ignore
                            ["tensionDuration", json.options?.animations?.tension?.duration],
                            // @ts-ignore
                            ["tensionEasing", json.options?.animations?.tension?.tensionEasing],
                            // @ts-ignore
                            ["tensionFrom", json.options?.animations?.tension?.from],
                            // @ts-ignore
                            ["tensionTo", json.options?.animations?.tension?.to],
                            // @ts-ignore
                            ["initialAnimationDuration", json.options?.animation?.duration],
                            ["yBase", json.options?.scales?.y?.min],
                            ["yMax", json.options?.scales?.y?.max],
                            ["gridYColor", json.options?.scales?.y?.grid?.color],
                            ["gridXColor", json.options?.scales?.x?.grid?.color],
                        ])
                        window.chartUpdate((prevState) => {
                            /**
                             * Check that a value isn't nullish, and update the state property
                             * @param property the key to edit in the prevState
                             * @param value the value of the key
                             */
                            function checkAndUpdate(property: any, value: any) {
                                // @ts-ignore
                                if (((value as unknown) ?? "NoValue") !== "NoValue") prevState[property] = value;
                            }
                            valueMap.forEach((value, key) => {
                                checkAndUpdate(key, value);
                            })
                            return { ...prevState, date: Date.now() }
                        });
                    }
                };
                input.click();
            }}>Import supported values from Chart.JS JSON object</button>
            <button onClick={() => { // Import the global values
                let input = document.createElement("input");
                input.type = "file";
                input.onchange = async () => {
                    if (input.files) {
                        const json = JSON.parse(await input.files[0].text()) as ExportGlobal;
                        const updateMap = new Map<string, any>([ // A map that contains the LocalStorage entries, with their future value
                            ["ChartAnimate-DefaultColor", json.color],
                            ["ChartAnimate-DefaultFontFamily", json.font],
                            ["ChartAnimate-Theme", json.theme],
                            ["ChartAnimate-DefaultDelay", json.delay]
                        ]);
                        updateMap.forEach((value, key) => {
                            if (((value as unknown) ?? "NoVal") !== "NoVal") localStorage.setItem(key, value); // Before applying, check that their value isn't nullish
                        });
                        applyGlobal(); // Apply these new global values
                        applyTheme(localStorage.getItem("ChartAnimate-Theme") === "a"); // And also change the application theme
                        window.chartUpdate(prevState => { return { ...prevState, date: Date.now() } }) // Update the graph with the new global values
                    }
                }
                input.click();
            }}>Import chart-animate values</button>
        </Card><br></br>
        <button onClick={() => { // Change the website theme from dark to light (or viceversas)
            localStorage.setItem("ChartAnimate-Theme", localStorage.getItem("ChartAnimate-Theme") === "a" ? "b" : "a")
            applyTheme(localStorage.getItem("ChartAnimate-Theme") === "a")
        }}>Change website theme (it won't change the chart colors)</button>
    </Card></div>
}