import { ReactNode } from "react"

interface Props {
    type: number,
    children: ReactNode
}
/**
 * Something like a Card, to differentiate application tabs
 * @param type a number that represents the color of the card. 1 for "second", 0 for "first", everything else for "background"
 * @param children the items inside the Card
 * @returns the Card ReactNode
 */
export default function Card({ type, children }: Props) {
    return <div className="card" style={{ backgroundColor: type === 1 ? "var(--second)" : type === 0 ? "var(--first)" : "var(--background)" }}>
        {children}
    </div>
}