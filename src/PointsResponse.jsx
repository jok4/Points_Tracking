import React, {useState} from "react";
import useGoogleSheets from "use-google-sheets";

const sheetName = "Total Points";

function PointsResponse() {
    const { data, loading, error } = useGoogleSheets ({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        sheetId: import.meta.env.VITE_SHEET_ID,
        sheetsOptions: [{ id: sheetName}],
    });

    const [linkBlue, setlinkBlue] = useState("")

    if(loading) {
        return (<div>Loading....</div>)
    }

    if (error) {
        throw new Error("Failed to Fetch Data")
    }

    /*
        Get Data returned from Google Sheets API and
        and quary out the users points count
    */
    function getPoints(linkBlue) {
        const responseData = data[0].data
        const searchColumn = "uniqueBlue"
        const outputColumn = "Total Points"
        let Points = "Not Found"

        for (let i = 0; i <= responseData.length; i++ ){
            //TODO Fix error handling
            if (!responseData[i][searchColumn])
            {
                Points = "not found"
            }
            
            if (responseData[i][searchColumn] == linkBlue)
            {
                Points = responseData[i][outputColumn]
                break
            }
            
        }
        return Points
        
    }

    function handleSubmit(e) {
        e.preventDefault(); //Prevents page reload
        const inputValue = e.target.linkblue.value
        setlinkBlue(inputValue)
    }

    return (
        <div>
            <div className="points-value">{getPoints(linkBlue)}</div>
            <div align="center">point(s)</div>
            <br></br>
            <form className="points-form" onSubmit={handleSubmit}>
                <input className="points-input" type="text" id="linkblue" placeholder="linkblue Id..." />
                <button>Enter</button>
            </form>            
        </div>
    )
}

export default PointsResponse