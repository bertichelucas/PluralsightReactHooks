import React, {useEffect, useState, useContext, useReducer, useCallback, useMemo} from 'react'
import { Header } from './Header'
import { Menu } from './Menu'
import SpeakerDetail from './SpeakerDetail'
import { ConfigContext } from './App'
import { GlobalContext } from './GlobalState'
import useSpeakerdataManager from './useSpeakerdataManager'

const Speakers = () => {

    //filtros para speakers que hablan o no los sabados o los domingos
    const [speakingSaturday, setSpeakingSaturday] = useState(true) 
    const [speakingSunday, setSpeakingSunday] = useState(true)

    const context = useContext(ConfigContext)

   

    //Importo my custom Hook desde el Global Context
    //Es importante notar que dentro del custom hook se manejan los estados relacionados  unicamente a la carga
    //de datos. El is loading y la lista. El resto de los estados se mantienen en la pagina.
    //ACA NO FUNCIONA EL GLOBAL CONTEXT
    const {isLoading, speakerList, toggleSpeakerFavorite} =  useContext(GlobalContext)
    
    const handleChangeSaturday = () =>{
        setSpeakingSaturday(!speakingSaturday)
    }

    const handleChangeSunday = () =>{
        setSpeakingSunday(!speakingSunday)
    }
    
    //Para filtar usamos el use memo. Con esto nos guardamos el resultado de la funcion
    //Y hacemos que no se vuelva a filtrar salvo que cambie alguna de las depedencias dentro del array

    const newSpeakerList = useMemo(()=>speakerList.filter(
        ({sat, sun}) => (speakingSaturday && sat) || (speakingSunday && sun)
    ), [speakingSaturday, speakingSunday, speakerList])

    const speakerListFiltered = isLoading ? [] :
        newSpeakerList

    //Uso use Callback ya que la funcion se la estoy pasando a cada uno de los speakers. Como se que la funcion no cambia entre renders
    //me sirve que cada uno de los speakers sepa que esa funcion no cambia asi no se vuelve a renderizar. Yo al actualizar el speaker, si no aclaro
    //me actualiza todos sus hijos
    const heartFavoriteHandler = useCallback((e, speakerRec)=>{
        e.preventDefault()
        toggleSpeakerFavorite(speakerRec)
        // setSpeakerList(
        //     speakerList.map((item)=> {
        //         if (item.id === sessionId){
        //             return {...item, favorite:favoriteValue}
        //         }
        //         return item
        //     })
        // )
    }, [])

    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            <Header/>
            <Menu/>
            <div className="container">

                <div className="btn-toolbar margintopbottom5 checkbox-bigger">
                    {context.showSpeakerSpeakingDays === false ? null : (
                    <div className="hide">
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"
                                onChange = {handleChangeSaturday}
                                checked={speakingSaturday}
                                />Speakers Saturday
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"
                                onChange = {handleChangeSunday}
                                checked={speakingSunday}
                                />Speakers Sunday
                            </label>
                            
                        </div>
                    </div>
                    )}
                </div>

                <div className="row">
                    <div className="card-deck">
                        {speakerListFiltered.map(
                            (speakerRec) =>{
                                return <SpeakerDetail key={speakerRec.id} speakerRec={speakerRec}
                                        onHeartFavoriteHandler ={heartFavoriteHandler}/>
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Speakers