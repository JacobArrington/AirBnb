import { csrfFetch } from "./csrf";


//acitons
export const GET_REVIEWS = 'reviews/GET_REVIEWS' 
export const ADD_REVIEW = 'reviews/ADD_REVIEWS'
export const DELETE_REVIEW = 'review/DELETE_REVIEW'


export const getReviews =(review) => {
    return {
        type: GET_REVIEWS,
        review,
        
    }
}

export const addReview =(review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

export const deleteReview =(reviewId) =>{
    return{
        type: DELETE_REVIEW,
        reviewId
    }
}

//thunks
export const fetchReviews = (spotId) => async(dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    const reviews = await response.json()
    console.log(reviews, '!!!!!! 18')
    dispatch(getReviews(reviews))
    console.log(reviews,'!!!!!!!!!!!!!!! 20')
}

export const postReview = (reviewData) => async(dispatch) =>{
    const {review , stars, spotId} = reviewData
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method: 'POST',
        
        body: JSON.stringify({review, stars})

    })
    if(response.ok){
        const newReview = await response.json()
        dispatch(addReview(newReview))
        return newReview
    }
}


export const removeReview = (review) => async(dispatch) =>{
    const response = await csrfFetch(`/api/reviews/${review.id}`,{
        method: 'DELETE'
    })
    if(response.ok){
        const review =await response.json()
        dispatch(deleteReview(review))
        return review
    }
}

const initReviewState = {}

const reviewReducer = (state = initReviewState, action) =>{
    let newState ={}
    switch (action.type){
        case GET_REVIEWS:
            console.log(action.review)
            newState ={...state, ...action.review}
            console.log(newState)
            return newState
        case ADD_REVIEW:
            newState = {...state}
            newState.Reviews[action.review?.id] = action?.review
            return newState
        case DELETE_REVIEW:
            newState ={ ...state }
            delete newState[action.review.id]
            return newState
    default: 
        return state
    }
}


export default reviewReducer
