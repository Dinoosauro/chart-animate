import Card from "../Components/Card"

/**
 * A card that permits to edit tension values, to make the chart a little bit more round
 * @returns a ReactNode of the SectionTension tab
 */
export default function SectionTension() {
    return <Card type={1}>
        <h3>Tension milliseconds:</h3>
        <input type="number" defaultValue={window.chartStateGet.tensionDuration} onChange={(e) => window.chartUpdate(prevState => { return { ...prevState, tensionDuration: +e.target.value } })}></input><br></br>
        <h3>Tension position start:</h3>
        <input type="number" defaultValue={window.chartStateGet.tensionFrom} onChange={(e) => window.chartUpdate(prevState => { return { ...prevState, tensionFrom: +e.target.value } })}></input><br></br>
        <h3>Tension position end:</h3>
        <input type="number" defaultValue={window.chartStateGet.tensionTo} onChange={(e) => window.chartUpdate(prevState => { return { ...prevState, tensionTo: +e.target.value } })}></input><br></br>
        <h3>Tension style</h3>
        <select defaultValue={window.chartStateGet.tensionEasing} onChange={(e) => window.chartUpdate(prevState => { return { ...prevState, tensionEasing: e.target.value } })} >
            {['linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc', 'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce'].map(e => <option value={e} >{e}</option>)}
        </select>
    </Card>
}