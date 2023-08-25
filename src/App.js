import React from 'react';
import Home from './Home.js';
import Speakers from './Speakers.js';
import { GlobalProvider } from './GlobalState.js';
import { FavoriteClickProvider } from './FavoriteClickContext.js';

export const ConfigContext = React.createContext() //Creo el contexto para toda mi aplicacion

const pageToShow = pageName => {
    if (pageName === 'Home') return <Home></Home>;
    if (pageName === 'Speakers') return <Speakers></Speakers>;
    return <div>Not Found</div>;
}

const configValue = { 
    //Este es el contexto que voy a estar almacenando
    showSignMeUp: true,
    showSpeakerSpeakingDays: true 
}

const App = ({ pageName }) => {
    return (
        //Wrapeo toda mi app dentro del contexto y en value pongo el contexto a almacenar
        <ConfigContext.Provider value = {configValue}>
            <GlobalProvider>
                <FavoriteClickProvider>
                    <div>{pageToShow(pageName)}</div>
                </FavoriteClickProvider>
            </GlobalProvider>
        </ConfigContext.Provider>
    )
};

export default App;
