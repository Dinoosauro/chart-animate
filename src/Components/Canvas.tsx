import { Chart, ChartConfiguration, registerables } from "chart.js";
Chart.register(...registerables);
import { useEffect, useRef, useState } from "react";
import { CanvasState } from "../Interface/Interfaces";
import JSZip, { file } from "jszip";
import { createRoot } from "react-dom/client";
import Download from "./Download";

let graph: Chart;
let zip = new JSZip();
interface DirectoryPicker {
    id?: string,
    mode?: string
}

declare global {
    interface Window {
        /**
         * Update the Chart by providing a valid CanvasState
         */
        chartUpdate: React.Dispatch<React.SetStateAction<CanvasState>>,
        /**
         * Get the currently-used Chart.JS configuration
         */
        chartGet: ChartConfiguration,
        /**
         * Get the current CanvasState
         */
        chartStateGet: CanvasState,
        /**
         * Read a directory from the user's drive
         * @param id the identifier of the operation
         * @param mode for this application, it must be "readwrite"
         * @returns A promise, resolved with a FileSystemDirectoryHandle
         */
        showDirectoryPicker: ({ id, mode }: DirectoryPicker) => Promise<FileSystemDirectoryHandle>,

    }
}
interface ZipSave {
    name: string,
    done: boolean
}
let zipState: ZipSave[] = [];
/**
 * Create the chart canvas, and edit its data using window functions
 * @returns the chart canvas
 */
export default function Canvas() {
    let [state, updateState] = useState<CanvasState>({
        datasets: [],
        labels: [],
        aspectRatio: 1,
        initialAnimationDuration: 500,
        date: Date.now() // Used to force re-render
    });
    useEffect(() => {
        window.chartUpdate = updateState;
        window.chartStateGet = state;
        window.chartGet = {
            type: state.type ?? "line",
            data: {
                labels: (() => { // Create an array with the length of the biggest data, and fill it with empty labels
                    let emptyArr = Array(state.datasets.map(e => e.data?.length).filter(e => e !== undefined).sort().reverse()[0]).fill("");
                    for (let i = 0; i < state.labels.length; i++) emptyArr[i] = state.labels[i]; // Replace the empty labels with the values from the state 
                    return emptyArr;
                })(),
                datasets: state.datasets.filter(e => (e?.data?.length ?? 0) > 0),
            },
            options: {
                aspectRatio: state.aspectRatio,
                indexAxis: state.horizontalChart ? 'y' : "x",
                animations: {
                    tension: {
                        duration: state.tensionDuration ?? 1000,
                        easing: (state.tensionEasing as "linear") ?? 'linear',
                        from: state.tensionFrom ?? 0,
                        to: state.tensionTo ?? 0,
                        loop: false
                    },
                    radius: {
                        duration: 400,
                        easing: 'linear',
                        loop: (context) => context.active
                    },
                },
                animation: {
                    onProgress: async () => {
                        if (state.savePng && canvas.current) {
                            const filename = `${zipState.length}.png`;
                            zipState.push({ name: filename, done: false });
                            canvas.current.toBlob(async (blob) => {
                                if (!blob) return;
                                if (state.handle) { // Handle provided: use File System API
                                    const file = await state.handle.getFileHandle(filename, { create: true });
                                    const writable = await file.createWritable();
                                    await writable.write(blob);
                                    await writable.close();
                                } else zip.file(filename, blob); // No handle: use zip file method
                                // @ts-ignore
                                zipState.find(e => e.name === filename).done = true;
                            })
                        };
                    },
                    onComplete: () => {
                        if (!state.savePng) return;
                        function createZip() {
                            if (zipState.filter(e => !e.done).length !== 0) { // Not everything has been exported. Retry after 150 seconds.
                                setTimeout(() => createZip(), 150);
                                return;
                            }
                            zip.generateAsync({ type: "blob" }).then((blob) => { // Create a zip blob and export it
                                let div = document.createElement("div");
                                createRoot(div).render(<Download close={() => div.remove()} a={<a href={URL.createObjectURL(blob)} download={`Chart-${Date.now()}.zip`}>Force download</a>}></Download>);
                                document.body.append(div);
                                setTimeout(() => div.querySelector("a")?.click(), 150);
                                updateState(prevState => { return { ...prevState, savePng: false } });
                            });
                        }
                        if (!state.handle) createZip(); else { // Write that the write operation has completed (since File System API was used)
                            let div = document.createElement("div");
                            createRoot(div).render(<div className="alert"><div className="flex hcenter"><label>Exportation completed</label><label className="link" onClick={() => div.remove()}>Close alert</label></div></div>);
                            document.body.append(div);
                        }
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default') {
                            delay = context.dataIndex * parseInt(localStorage.getItem("ChartAnimate-DefaultDelay") ?? "0");
                        }
                        return delay;
                    },
                    duration: state.initialAnimationDuration,
                    easing: 'linear'
                },
                scales: {
                    y: {
                        min: state.yBase,
                        max: state.yMax,
                        grid: {
                            color: state.gridYColor
                        }
                    },
                    x: {
                        grid: {
                            color: state.gridXColor
                        }
                    }

                }
            }
        }
    })
    let canvas = useRef<HTMLCanvasElement>(null);
    useEffect(() => { // Re-render the canvas
        if (canvas.current) {
            const ctx = canvas.current.getContext("2d");
            if (ctx) {
                Chart.getChart(ctx)?.destroy()
                graph = new Chart(ctx, window.chartGet);
            }
        }
    });
    return <div className={state.savePng ? "canvasExport" : undefined}><canvas ref={canvas}></canvas></div>
}