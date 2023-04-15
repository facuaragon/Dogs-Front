import { GET_ALL_DOGS, GET_DOG_DETAIL, CLEAN_DETAIL, GET_DOGS_BY_NAME, ADD_DOG, GET_TEMPERAMENTS } from "./action-types"

const initialState = {
    allDogs: [],
    dogsCopy: [],
    temperaments: [],
    dogSearch: {},
    dogDetail: {}
};

const rootReducer = (state=initialState, action) =>{  

    switch (action.type){
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                dogsCopy: action.payload
            }

        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            }
    
        case CLEAN_DETAIL:
            return {
                ...state,
                dogDetail: {}
            }

        case GET_DOGS_BY_NAME:
            return {
                ...state,
                dogSearch: action.payload
            }
        case ADD_DOG:
            return {
                ...state,
                allDogs: [...state.allDogs, action.payload]
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
    
        default:
            return {...state}
    }

}

export default rootReducer;