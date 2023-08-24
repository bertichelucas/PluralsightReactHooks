import React from 'react'
import useSpeakerdataManager from './useSpeakerdataManager';

export const GlobalContext =
    React.createContext()

export const GlobalProvider = ({children}) =>{

    const {isLoading, speakerList, favoriteClickCount, incrementFavoriteClickCount, toggleSpeakerFavorite} = useSpeakerdataManager();

    

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