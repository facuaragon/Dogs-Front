import { GET_ALL_DOGS, GET_DOG_DETAIL, CLEAN_DETAIL, GET_DOGS_BY_NAME, ADD_DOG, GET_TEMPERAMENTS } from "./action-types"
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
        const response = await axios.post("localhost:3001/dogs/", dog)
        dispatch({type: ADD_DOG, payload: response.data})
    }
}

export const getTemperaments = () => {
    return async function(dispatch){
        const response = await axios.get("localhost:3001/temperaments")
        dispatch({type: GET_TEMPERAMENTS, payload: response.data})
    }
}