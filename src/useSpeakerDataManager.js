import React,{useEffect, useReducer, useContext} from 'react'
import speakerData from './SpeakerData'
import speakerReducer from './speakersReducer'
import axios from 'axios'

import { InitialSpeakersDataContext } from '../pages/speakers'

function useSpeakerdataManager(){

    const initialSpeakersData = useContext(InitialSpeakersDataContext)
    //Cuando llamamos a dispatch, le pasamos el tipo de accion y el hook use Reducer se encarga de llamar al speaker reducer. El estado lo devuelve por defecto
    //Y es nuestra speaker list
    const [{isLoading, speakerList, favoriteClickCount}, dispatch] = useReducer(speakerReducer, {speakerList: initialSpeakersData, isLoading: false, favoriteClickCount: 0}) 

    function incrementFavoriteClickCount(){
        dispatch({type: 'incrementFavoriteClickCount'})
    }

    //Creo una funcion para mantener la logica del dispatch adentro y no tener que usarlo desde afuera
    function toggleSpeakerFavorite(speakerRec){

        //Tengo que crear una funcion y luego llamarla si quiero usar una asyncrona
        const updateData = async function(){
            axios.put(`/api/speakers/${speakerRec.id}`, {...speakerRec, favorite: !speakerRec.favorite})
            speakerRec.favorite === true ? dispatch({type: "unfavorite", id: speakerRec.id}) :
            dispatch({type: "favorite", id: speakerRec.id})
        }

        updateData()
    }

    useEffect(() => {

        // new Promise(function(resolve){
        //     setTimeout(()=>{
        //         resolve(); //Simulo una carga asincronica y cuando termina de cargar lo seteo
        //     }, 1000)
        // }).then(()=> {
            
        //     //Setteo la lista de speakers que me deberia llegar si fuera asincronica
        //     //setSpeakerList(speakerData)
        //     dispatch({
        //         type: "setSpeakerList",
        //         data: speakerData //En este caso le paso la data que quiero que me retorne el useReducer con el caso setSpeakerList
        //     })
        // })

        //prueba con axios y nuestra api speakers.
        const fetchData = async function(){
            try{
                let result = await axios.get('/api/speakers')
                dispatch({type: "setSpeakerList", data: result.data})
            }catch(e){
                dispatch({type: "errored", error: e})
            }
        }
        fetchData()
    
        //El return es para hacer el cleanup en el component will unmount
        return () => {
            console.log("Cleanup")
        }
    }, [])
    return {isLoading, speakerList, favoriteClickCount, incrementFavoriteClickCount, toggleSpeakerFavorite}
}


export default useSpeakerdataManager