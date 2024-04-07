import Card from "../Components/Card"

/**
 * The tab that permits to change the default animation settings
 * @returns A ReactNode of the SectionAnimation card
 */
export default function SectionAnimation() {
    return <Card type={1}>
        <h3>Loading animation length (in ms):</h3>
        <input type="number" defaultValue={window.chartStateGet.initialAnimationDuration} onChange={(e) => window.chartUpdate(prevState => { return { ...prevState, initialAnimationDuration: +e.target.value } })}></input><br></br>
        <h3>Line loading animation delay (in ms):</h3>
        <input type="number" defaultValue={localStorage.getItem("ChartAnimate-DefaultDelay") ?? undefined} onChange={(e) => {
            localStorage.setItem("ChartAnimate-DefaultDelay", e.target.value);
            window.chartUpdate(prevState => { return { ...prevState, date: Date.now() } });
        }}></input><br></br>
    </Card>
}