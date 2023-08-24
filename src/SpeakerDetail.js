import React, { useContext } from 'react'
import ImageToggleOnScroll from './ImageToggleOnScroll'
import useSpeakerdataManager from './useSpeakerdataManager'
import { GlobalContext } from './GlobalState'

//React.memo me sirve para retornar una version memorizada del componente al componente original que lo llama. De esta manera no
//lo va a estar renderizando constantemente
const SpeakerDetail = React.memo(({speakerRec, onHeartFavoriteHandler}) => {

    const {id, firstName, lastName, bio, favorite} = speakerRec

    const {incrementFavoriteClickCount} = useContext(GlobalContext)

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