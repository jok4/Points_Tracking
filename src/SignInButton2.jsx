import React, {useEffect, useState} from 'react';
import jwtDecode from 'jwt-decode';

function SignInButton2() {
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
    const SCOPES = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/forms'
    
    const [ user, setUser ] = useState({});
    const [ tokenClient, setTokenClient ] = useState({});



    function handleCallback(response) {
        //console.log("Encoded JWT ID token: " + response.credential);
        console.log(response.credential)
        var userObject = jwtDecode(response.credential);
        console.log(userObject);
        setUser(userObject)
        document.getElementById("signInDiv").hidden = true;
        //
        createNewGoogleSheet(response.credential.access_token);
    }

    function handleSignOut() {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    function createNewGoogleSheet(accessToken) {
        fetch('https://sheets.googleapis.com/v4/spreadsheets', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            properties: {
              title: '[POINTS] Engagement Tracking1', 
            },
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const newSheetId = data.spreadsheetId;
            console.log('New Google Sheet created with ID:', newSheetId);
            // Do something with the newSheetId, like redirecting the user to the newly created sheet
            copyDataAndFormulas(accessToken, import.meta.env.VITE_SHEET_ID, newSheetId);
          })
          .catch((error) => {
            console.error('Error creating new Google Sheet:', error);
          });
      }


    // Helper function to copy data and formulas
    function copyDataAndFormulas(accessToken, sourceSheetId, targetSheetId) {
        // Fetch data from existing sheet
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sourceSheetId}/values:batchGet`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        })
        .then((response) => response.json())
        .then((data) => {
        const valueRanges = data.valueRanges || [];
        
        // Prepare requests to copy data to the new sheet
        const requests = valueRanges.map(valueRange => ({
            copyPaste: {
            source: `='${sourceSheetId}'!${valueRange.range}`, // Adjust source range
            destination: `='${targetSheetId}'!${valueRange.range}`, // Adjust destination range
            pasteType: 'PASTE_NORMAL',
            pasteOrientation: 'NORMAL',
            }
        }));
        
        // Execute batch update requests to copy data and formulas
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/d/${targetSheetId}:batchUpdate`, {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            requests: requests,
            }),
        })
        .then(() => {
            console.log('Data and formulas copied successfully.');
        })
        .catch((error) => {
            console.error('Error copying data and formulas:', error);
        });
        })
        .catch((error) => {
        console.error('Error retrieving data from source sheet:', error);
        });
    }


      
    function initiateAccessRequest() {
        tokenClient.requestAccessToken();
    }
  


    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCallback
        })

        google.accounts.id.prompt();

        //TOKEN CLIENT  
        setTokenClient(
            google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: (tokenResponse) => {
                    console.log(tokenResponse)
                    // we now have access to live working token to use for any googel api.. ?
                    createNewGoogleSheet(tokenResponse.access_token)
                }
            })
        )
    }, []);

    return (
        <div className='SignInButton2'>
            <div id='signInDiv'></div>
            {
                Object.keys(user).length != 0 &&
                <button onClick={ (e) => handleSignOut()}>Sign Out</button>
            }
            {
                user && 
                <div>
                    <img src={user.picture}></img>
                    <h3>{user.name}</h3>
                    <input type='submit' onClick={initiateAccessRequest} value="Create SpreadSheet" />
                </div>
            }
        </div>
    )
}

export default SignInButton2