import { ReactNode } from "react";
import Card from "./Card";

interface Props {
    a: ReactNode;
    close: () => void
}
/**
 * 
 * @param a the URL that'll be displayed for downloading a file
 * @param close the function called for closing the alert
 * @returns 
 */
export default function Download({ a, close }: Props) {
    return <div className="alert">
        <div className="flex hcenter">
            <label>The download has started</label>
            <span style={{ marginLeft: "10px" }}></span>
            {a}
            <span style={{ marginLeft: "10px" }}></span>
            <label onClick={close} className="link">Close alert</label>
        </div>
    </div>
}