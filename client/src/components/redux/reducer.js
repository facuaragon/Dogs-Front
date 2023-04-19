import { GET_ALL_DOGS, GET_DOG_DETAIL, CLEAN_DETAIL, GET_DOGS_BY_NAME, ADD_DOG, GET_TEMPERAMENTS, FILTER_BY_NAME, FILTER_BY_WEIGHT, FILTER_CREATED_DOG, FILTER_BY_TEMPERAMENTS, CLEAN_FILTERS } from "./action-types"

const initialState = {
    allDogs: [],
    dogsCopy: [],
    dogsFiltered: [],
    temperaments: [],
    dogDetail: {}
};

const rootReducer = (state=initialState, action) =>{  

    switch (action.type){
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                dogsCopy: action.payload,
                dogsFiltered: action.payload
            }

        case GET_DOGS_BY_NAME:
            return {
                ...state,
                dogsFiltered: action.payload,
                allDogs: action.payload,
            }

        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
    
        case CLEAN_DETAIL:
            return {
                ...state,
                dogDetail: {}
            }

        case FILTER_BY_NAME:
            const filteredDogs = action.payload === "A-Z" ? state.allDogs.sort((a,b)=>{
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0
            })
            : state.allDogs.sort((a,b)=>{
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0
            });
            return {
                ...state,
                allDogs: filteredDogs,
                dogsFiltered: filteredDogs,
            }

        case FILTER_BY_WEIGHT:
            const filteredWeight = action.payload === 'min_weight' ? state.dogsFiltered.sort((a, b) => {
                return Number(a.weight.split(" - ")[0]) - Number(b.weight.split(" - ")[0])
            })  :
            state.dogsFiltered.sort((a,b) =>{
            return Number(a.weight.split(" - ")[1]) - Number(b.weight.split(" - ")[1])
            }).reverse()
            
            return {
            ...state,
            allDogs: filteredWeight,
        };  

        case FILTER_CREATED_DOG:
            const allDogs = state.dogsFiltered;
            const filteredCreated = allDogs.filter(dog=>dog.createdInDb)
            const filteredApi = allDogs.filter(dog => !dog.createdInDb)
            return {
                ...state,
                allDogs: action.payload === "all" ? state.dogsFiltered : ( action.payload === "Created By Users" ? filteredCreated : filteredApi )
            }
        case FILTER_BY_TEMPERAMENTS:
            const dogs = state.dogsFiltered
            const filteredTemp = action.payload === 'All'?  state.dogsFiltered : dogs.filter(dog => {
                return dog.temperament?.includes(action.payload)
            })
            return {
                ...state,
                allDogs: filteredTemp,
            };
        case CLEAN_FILTERS:
            return {
                ...state,
                allDogs: state.dogsCopy,
                filteredDogs: state.dogsCopy
            }

        case ADD_DOG:
            return {
                ...state,
                allDogs: [...state.dogsCopy, action.payload],
                dogsCopy: [...state.dogsCopy, action.payload],
                dogsFiltered: [...state.dogsCopy, action.payload],
            }
    
        default:
            return {...state}
    }

}

export default rootReducer;