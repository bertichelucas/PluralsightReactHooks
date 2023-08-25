import React from 'react'
import useSpeakerdataManager from './useSpeakerdataManager';

export const GlobalContext =
    React.createContext()

export const GlobalProvider = ({children}) =>{

    const {isLoading, speakerList, favoriteClickCount, incrementFavoriteClickCount, toggleSpeakerFavorite} = useSpeakerdataManager();

    //El problema con este contexto es que mi speaker list cambia todo el tiempo por lo que
    //Fuerza a mis componentes a renderizarse nuevamente si usan el contexto
    //Por ejemplo el speaker detail que solo necesita el increment count recibe esta info
    //y se ve forzado a actualizarse
    //Por lo tanto existe la posibilidad de crear contextos globales anidados que solo utilicen una data en particular


    const provider = {
        isLoading,
        speakerList,
        favoriteClickCount,
        incrementFavoriteClickCount,
        toggleSpeakerFavorite
    }

    
    return(
        <GlobalContext.Provider value={provider}>
            {children}
        </GlobalContext.Provider>
    )
}