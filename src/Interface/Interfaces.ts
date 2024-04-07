import { ChartDataset, ChartTypeRegistry } from "chart.js";

export interface CanvasState {
    datasets: ChartDataset[],
    labels: string[],
    savePng?: boolean,
    yBase?: number,
    yMax?: number,
    type?: keyof ChartTypeRegistry,
    tensionDuration?: number,
    tensionEasing?: string,
    tensionTo?: number,
    tensionFrom?: number,
    gridXColor?: string,
    gridYColor?: string,
    delay?: number
    date?: number,
    handle?: FileSystemDirectoryHandle,
    aspectRatio: number,
    horizontalChart?: boolean,
    initialAnimationDuration?: number
}
export interface MainState {
    action: string,
    line: number,
    type: string,
    data?: number
}
export interface ExportGlobal {
    color: string,
    font: string,
    theme: string,
    delay: string
}