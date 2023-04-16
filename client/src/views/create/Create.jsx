import { useState } from 'react';
import styles from './Create.module.css'

function Create(){
    const [input, setInput]=useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span: '',
        temperaments: []
    })
    const [errors, setErrors]=useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span: '',
        temperaments: []
    })

    const validate = (input)=>{
        if(!/^[a-zA-Z]+$/.test(input.name)){
            setErrors({...errors, name: "The breed must have only letters"})
            return;
        }
        setErrors({...errors, name: ""})
        
    }

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        validate({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <p>Create Page</p>
            <form onSubmit={""}>
                <div>
                    <label>Breed: </label>
                    <input name="name" value={input.value} onChange={handleChange}/>
                    <span>{errors.name}</span>
                </div>
                <div>
                    <label>Height: min: </label>
                    <input name="weight_min" value={input.value} onChange={handleChange}/>
                    <label>max: </label>
                    <input name="weight_max" value={input.value} onChange={handleChange}/>
                </div>
                <div>
                    <label>Height: min: </label>
                    <input name="height_min" value={input.value} onChange={handleChange}/>
                    <label>max: </label>
                    <input name="height_max" value={input.value} onChange={handleChange}/>
                </div>
                <div>
                    <label>Life Span: </label>
                    <input name="life_span" value={input.value} onChange={handleChange}/>
                </div>
                <div>
                    <label>Temperaments: </label>
                    <input name="temperaments" value={input.value} onChange={handleChange}/>
                </div>
                <button type="submit">Create!</button>
            </form>
        </div>
    )
}

export default Create;