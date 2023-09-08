import { DotLoader } from "react-spinners";
import { useState, CSSProperties } from "react";
import "../../../scss/Loader.scss"


export default function Loader() {
    let [loading, setLoading] = useState(true);
    return(
        <div className="loader-container">

        <DotLoader color="#36d7b7"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
        </div>
    )

}