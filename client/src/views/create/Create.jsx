import { useEffect, useState } from 'react';
import styles from './Create.module.css'
import axios from 'axios';
import { validation } from './validation';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, addDog} from '../../components/redux/actions';
import { useNavigate } from 'react-router-dom';

function Create(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTemperaments()) 
    },[dispatch])

    const allTemperaments = useSelector((state)=>state.temperaments)
    

    const disabled = (<button type="submit" disabled>Create!</button>)

    const [input, setInput]=useState({
        name: '',
        height_min: 0,
        height_max: 0,
        weight_min: 0,
        weight_max: 0,
        life_span_min: 0,
        life_span_max: 0,
        image: '',
        temperaments: []
    })
    const [errors, setErrors]=useState({
        name: ' ',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span_min: '',
        life_span_max: '',
        image: '',
        temperaments: ''
    })

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(validation({
            ...input,
            [event.target.name]: event.target.value
        }))
        // console.log(errors);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newDog = {
            name: input.name,
            height: `${input.height_min} - ${input.height_max}`,
            weight: `${input.weight_min} - ${input.weight_max}`,
            life_span: `${input.life_span_min} - ${input.life_span_max} years`,
            temperament: input.temperaments,
            image: input.image 
        }

        const response = await axios.post("http://localhost:3001/dogs/", newDog)
        const dogCreated = response.data;
        
        console.log(dogCreated);

        if(dogCreated.error){
            alert("The breeds name already exists")
        }
        else{
            dispatch(addDog(dogCreated));
            navigate(`/home/${dogCreated.id}`);
        }     
    }

    const handleSelect = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        
        const selectedValues = selectedOptions.map(option => Number(option.value));
        //console.log(selectedValues);
        setInput({
            ...input,
            [event.target.name]: selectedValues
        })
        setErrors(validation({
            ...input,
            [event.target.name]: selectedValues
        }))

        return selectedValues
    }

  
    return (
        <div>
            <p>Create Page</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Breed Name: </label>
                    <input name="name" value={input.value} onChange={handleChange}/>
                    <span>{errors.name}</span>
                </div>
                <div>
                    <label>Weight: min: </label>
                    <input name="weight_min" value={input.value} onChange={handleChange}/>
                    <span>{errors.weight_min}</span>
                    <label>max: </label>
                    <input name="weight_max" value={input.value} onChange={handleChange}/>
                    <span>{errors.weight_max}</span>
                </div>
                <div>
                    <label>Height: min: </label>
                    <input name="height_min" value={input.value} onChange={handleChange}/>
                    <label>max: </label>
                    <span>{errors.height_min}</span>
                    <input name="height_max" value={input.value} onChange={handleChange}/>
                    <span>{errors.height_max}</span>

                </div>
                <div>
                    <label>Life Span: min: </label>
                    <input name="life_span_min" value={input.value} onChange={handleChange}/>
                    <span>{errors.life_span_min}</span>
                    <label>max: </label>
                    <input name="life_span_max" value={input.value} onChange={handleChange}/>
                    <span>{errors.life_span_max}</span>

                </div>
                <div>
                    <label>Image: </label>
                    <input name="image" value={input.value} onChange={handleChange}/>
                    <span>{errors.image}</span>
                </div>
                <div>
                    <label>Temperaments: </label>
                    <select name="temperaments" onChange={handleSelect} multiple={true}>
                        {
                            allTemperaments.map(temp=>{
                                return (
                                    <option value={temp.id} key={temp.id}>{temp.name}</option>
                                )
                            })
                        }
                    </select>
                    <span>{errors.temperaments}</span>
                </div>
                { errors.name ? disabled : ( errors.height_max ? disabled : ( errors.height_min ? disabled : ( errors.weight_min ? disabled : ( errors.weight_max ? disabled : ( errors.life_span_min ? disabled : ( errors.life_span_max ? disabled : ( errors.temperaments ? disabled : ( errors.image ? disabled : <button type="submit">Create!</button>))))))))}
               
            </form>
        </div>
    )
}

export default Create;