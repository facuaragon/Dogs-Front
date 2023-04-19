import { GET_ALL_DOGS, GET_DOG_DETAIL, CLEAN_DETAIL, GET_DOGS_BY_NAME, ADD_DOG, GET_TEMPERAMENTS, FILTER_BY_NAME, FILTER_BY_WEIGHT, FILTER_CREATED_DOG, FILTER_BY_TEMPERAMENTS, CLEAN_FILTERS } from "./action-types"
import axios from "axios";

export const getAllDogs = () =>{
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/dogs/");
        dispatch({type: GET_ALL_DOGS, payload: response.data})
    }
}

export const getDogDetail = (id) =>{
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/dogs/${id}`);
        dispatch({type: GET_DOG_DETAIL, payload: response.data})
    }
}

export const cleanDetail = () =>{
    return {type: CLEAN_DETAIL};
}

export const getDogsByName = (name) =>{
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/dogs/?name=${name}`);
        dispatch({type: GET_DOGS_BY_NAME, payload: response.data})
    }
}

export const addDog = (dog) =>{
    return async function(dispatch){
        dispatch({type: ADD_DOG, payload: dog})
    }
}

export const getTemperaments = () => {
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/temperaments")
        dispatch({type: GET_TEMPERAMENTS, payload: response.data})
    }
}

export const filterByName = (payload) => {
    return { type: FILTER_BY_NAME, payload }
}

export const filterByWeight = (payload) => {
    return { type: FILTER_BY_WEIGHT, payload }
}

export const filterCreatedDog = (payload) => {
    return { type: FILTER_CREATED_DOG, payload }
}

export const filterByTemperament = (payload) => {
    return{ type: FILTER_BY_TEMPERAMENTS, payload }
}

export const cleanFilters = () => {
    return {type: CLEAN_FILTERS}
}
