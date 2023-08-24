import React from 'react';
import App from '../src/App';
import path from 'path';
import fs from 'fs';

export const InitialSpeakersDataContext = React.createContext();

//Como crear server-side rendering:
//Esta funcion va a devolver un objeto javaScript con una prop llamada property
//De esta manera cargo mis datos desde el lado del servidor y quedan embebidos en el codigo html
export async function getServerSideProps(){

    const { promisify} = require('util')
    const readFile = promisify(fs.readFile)
    const jsonFile = path.resolve('./', 'db.json');
    let initialSpeakersData;
    try{
        const readFileData = await readFile(jsonFile)
        initialSpeakersData = JSON.parse(readFileData).speakers
    }catch(e){
        console.log("/api/speakers error: ", e)
    }
    return {props: {initialSpeakersData}}   
}

function speakers({initialSpeakersData}) {
    return <InitialSpeakersDataContext.Provider value={initialSpeakersData}>
                <App pageName="Speakers" />
            </InitialSpeakersDataContext.Provider>;
}

export default speakers;
