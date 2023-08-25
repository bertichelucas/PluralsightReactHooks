import React, { useContext } from 'react'
import ImageToggleOnScroll from './ImageToggleOnScroll'
import useSpeakerdataManager from './useSpeakerdataManager'
import { GlobalContext } from './GlobalState'
import FavoriteClickContext from './FavoriteClickContext'

//React.memo me sirve para retornar una version memorizada del componente al componente original que lo llama. De esta manera no
//lo va a estar renderizando constantemente. El react memo entonces me guard en memoria mi componente. Me retorna siempre el mismo
//Salvo que cambien las props que recibe. Es parecido al use memo con la diferencia que se usa para componentes en vez de para funciones
const SpeakerDetail = React.memo(({speakerRec, onHeartFavoriteHandler}) => {

    const {id, firstName, lastName, bio, favorite} = speakerRec

    console.log(`Me actualizo con id: ${id}`)

    const {incrementFavoriteClickCount} = useContext(FavoriteClickContext) //Esto me hace que se renderize todo el componente nuevamente

    return (
        <div className="card col-4 cardmin">
            <ImageToggleOnScroll className="card-img-top" primaryImg={`/static/speakers/bw/Speaker-${id}.jpg`}
                                    secondaryImg={`/static/speakers/Speaker-${id}.jpg`}
                                    alt={`${firstName} ${lastName}`}/>
            <div className="card-body">
                <h4 className="card-title">
                    <button className={favorite? 'heartredbutton': 'heartdarkbutton'}
                            onClick = {(e)=> {
                                onHeartFavoriteHandler(e, speakerRec)
                                incrementFavoriteClickCount()
                            }}    
                    />
                    <span>{firstName} {lastName}</span>
                </h4>
                
                <span>{bio}</span>
            </div>
        </div>
    )
})

export default SpeakerDetail