
import { GET_ALL_DOGS, GET_DOG_DETAIL, CLEAN_DETAIL, GET_DOGS_BY_NAME, GET_TEMPERAMENTS, FILTER_BY_NAME, FILTER_BY_WEIGHT, FILTER_CREATED_DOG, FILTER_BY_TEMPERAMENTS, CLEAN_FILTERS, CLEAN_DOGS, ERRORS, CLEAN_ERRORS } from "./action-types"

const initialState = {
    allDogs: [],
    dogsCopy: [],
    dogsFiltered: [],
    temperaments: [],
    dogDetail: {},
    errors: ""
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
            const managedDogs = state.dogsFiltered
            const filteredDogs = action.payload === "A-Z" ? managedDogs.sort((a,b)=>{
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0
            })
            : managedDogs.sort((a,b)=>{
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0
            });
            return {
                ...state,
                allDogs: filteredDogs,
            }

        case FILTER_BY_WEIGHT:
            let weights = state.dogsFiltered.map((dog)=>{
                let min= dog.weight.split(" - ")[0];
                if(min === "NaN" || !min ) min = 100;
                let max= dog.weight.split(" - ")[1];
                if(max === "NaN" || !max ) max = 1;
                return {
                    ...dog,
                    min_weight: Number(min),
                    max_weight: Number(max)
                }
            })
            const filteredWeight = action.payload === 'min_weight' ? weights.sort((a, b) => {
                    if(isNaN(a.min_weight) || isNaN(b.min_weight)) return 1
                    if(a.min_weight > b.min_weight) return 1;
                    if(a.min_weight < b.min_weight) return -1;
                    return 0
                })  :
                weights.sort((a,b) =>{
                    if(isNaN(a.max_weight) || isNaN(b.max_weight)) return 1
                    if(b.max_weight > a.max_weight) return 1;
                    if(b.max_weight < a.max_weight) return -1;
                    return 0
                }); 
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
                dogsFiltered: state.dogsCopy
            }            
        case CLEAN_DOGS:
            return {
                ...state,
                allDogs: [],
            }
        case ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        case CLEAN_ERRORS:
            return {
                ...state,
                errors: "",
            }
        default:
            return {...state}
    }

}

export default rootReducer;