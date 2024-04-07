import { defaultDataset } from "./DefaultDataset";

interface SetDataset {
    line: number,
    update: any
}

/**
 * Update the value of a property of the specified datasaet
 * @param line the number of the dataset array
 * @param update the content to update
 */
export default function updateValueDataset({ line, update }: SetDataset) {
    window.chartUpdate(prevState => {
        if (!prevState.datasets[line]) prevState.datasets[line] = defaultDataset;
        prevState.datasets[line] = {
            ...prevState.datasets[line],
            ...update
        }
        return { ...prevState, date: Date.now() }
    })

}