import React, {createContext, useContext, useCallback} from 'react'
import { GlobalContext } from './GlobalState'

export const FavoriteClickContext = createContext()

export const FavoriteClickProvider = ({children}) =>{
    const { incrementFavoriteClickCount } = useContext(GlobalContext)

    const provider = {
        incrementFavoriteClickCount
    } //PROBLEMA --> ESTO ME CAUSA EL RE-RENDER DE LOS COMPONENTES
    // NO DEBERIA PASAR. USECALLBACK?

    return(
        <FavoriteClickContext.Provider value={provider}>
            {children}
        </FavoriteClickContext.Provider>
    )
}

export default FavoriteClickContext