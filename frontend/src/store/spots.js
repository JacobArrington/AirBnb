import { csrfFetch } from "./csrf"

// Actions
const SET_SPOTS = 'spots/SET_SPOTS'
const GET_SPOT_DETAIL = 'spots/GET_SPOT_DETAIL'
const ADD_SPOT = 'spots/ADD_SPOT'
const ADD_SPOT_IMAGES = 'spots/ADD_SPOT_IMAGES'
export const setSpots = (spots) => {
    return{
        type: SET_SPOTS,
        spots
    }
}
const getSpotDetail =(spotDetails) =>{
    return {
        type: GET_SPOT_DETAIL,
        spotDetails
    }
}

export const addSpotSuccess =(spot) =>{
    return{
        type:ADD_SPOT,
        spot
    }
}

export const addSpotImage = (spotId, images) =>{
    return{
        type:ADD_SPOT_IMAGES,
        spotId,
        images,
    }
}

//Thunks
export const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    const spots = await response.json()
    //console.log(response , '!!!!!' , spots)
    dispatch(setSpots(spots))
    //return spots
}

export const fetchSpotDetail = (spotId) => async(dispatch) =>{
    const response = await fetch(`/api/spots/${spotId}`)
    if(response.ok){
    const spotDetail = await response.json()
    dispatch(getSpotDetail(spotDetail))
    }
}

export const postSpot =(spotData) => async(dispatch) =>{
    const {name,description, price, address, city, state, country, images,} = spotData
    //console.log(images)
    const response = await csrfFetch('/api/spots',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,description, price, address, city, state, country,})
    })
    if (response.ok){
        const createdSpot = await response.json()
        dispatch(addSpotSuccess(createdSpot))
       for await(let image of images ){
            let imageRes = await csrfFetch(`/api/spots/${createdSpot.id}/images`,{
                method: 'POST',
                body: JSON.stringify({url:image, preview:true})
            })
            if(imageRes.ok){
                imageRes = await imageRes.json()
                console.log(imageRes)
            }
       }
        
        return createdSpot
    }
    
}


  
  
  


// Reducer and State
const initSpotState = {
    
}

 const spotReducer =(state = initSpotState, action) =>{
    switch(action.type){
        case SET_SPOTS:
            return action?.spots
        case GET_SPOT_DETAIL:
            return {
                ...state,
                spotDetails: action?.spotDetails
            }
        case ADD_SPOT:
            return  {...state, [action.spot.id] : action.spot};
               
                
            
          
      
        default:
            return state
    }
}

export default spotReducer;
