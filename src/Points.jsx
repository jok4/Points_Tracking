import React from "react"
import PointsResponse from "./PointsResponse.jsx"
import ErrorBoundary from "./ErrorBoundary.jsx"
import Header from "./Header.jsx"

function Points() {
    return (
        <div className="points-div">
            <Header />
            <ErrorBoundary>
                <PointsResponse />
            </ErrorBoundary>
        </div>
    )
}

export default Points