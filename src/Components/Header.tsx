/**
 * The title and the logo of chart-animate
 * @returns The Header ReactNode
 */
export default function Header() {
    return <div className="flex hcenter wcenter">
        <img src={"./icon.svg"} width={48} style={{ marginRight: "10px" }}></img>
        <h1>chart-animate</h1>
    </div>
}