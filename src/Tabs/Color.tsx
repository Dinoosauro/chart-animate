import Card from "../Components/Card";
import DataContainer from "../Components/DataContainer";
import updateValueDataset from "../Scripts/UpdateValueDataset";
interface Props {
    line: number
}
/**
 * The card that permits to change the custom color(s) about the background and the line
 * @param line the current dataset
 * @returns A ReactNode of the SectionColor card
 */
export default function SectionColor({ line }: Props) {
    return <Card type={1}>
        <h3>Line color(s):</h3>
        <DataContainer type="color" defaultValues={(() => { // Get, if available, the color strings. Check that the property exists, and, if it's a string, convert it as an array. Note that this must be done in this way since it might return a single color, and this would break the DataContainer default values
            if (!window.chartGet || !window.chartGet.data?.datasets || !window.chartGet.data?.datasets[line] || !window.chartGet.data.datasets[line].backgroundColor) return [];
            const str = window.chartGet.data.datasets[line].backgroundColor;
            if (typeof str === "string") return [str];
            return Array.from(str as string[]).map(e => e.toString()) as string[];
        })()} callback={(item) => updateValueDataset({
            line: line, update: {
                backgroundColor: item,
            }
        })} hint="Custom colors"></DataContainer>
        <h3>Line border(s):</h3>
        <DataContainer type="color" defaultValues={(() => { // Same as before
            if (!window.chartGet || !window.chartGet.data?.datasets || !window.chartGet.data?.datasets[line] || !window.chartGet.data.datasets[line].borderColor) return [];
            const str = window.chartGet.data.datasets[line].borderColor;
            if (typeof str === "string") return [str];
            return Array.from(str as string[]).map(e => e.toString()) as string[];
        })()} callback={(item) => updateValueDataset({
            line: line, update: {
                borderColor: item
            }
        })} hint="Custom colors"></DataContainer>

    </Card>
}