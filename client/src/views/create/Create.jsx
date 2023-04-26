import { useEffect, useState } from 'react';
import styles from './Create.module.css'
import axios from 'axios';
import { validation } from './validation';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments} from '../../components/redux/actions';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

function Create(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTemperaments()) 
    },[dispatch])

    const allTemperaments = useSelector((state)=>state.temperaments)
    

    const disabled = (<button className={styles.submit} type="submit" disabled>Create!</button>)

    const [input, setInput]=useState({
        name: '',
        height_min: 0,
        height_max: 0,
        weight_min: 0,
        weight_max: 0,
        life_span_min: 0,
        life_span_max: 0,
        image: 0,
        temperaments: [],
        temperamentsName: "",
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
        

        if(dogCreated.error){
            alert("The breeds name already exists")
        }
        else{
            navigate(`/home/${dogCreated.id}`);
        }     
    }

    const handleSelect = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        
      
        
        const selectedValues = selectedOptions.map(option => Number(option.value))
        const selectedNames = selectedOptions.map(option => option.title);
        

        setInput({
            ...input,
            [event.target.name]: selectedValues,
            temperamentsName: selectedNames.join(", ")
        })
        setErrors(validation({
            ...input,
            [event.target.name]: selectedValues
        }))

        return selectedValues
    }

  
    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.padContainer}>
                    <h2 className={styles.padTitle}>{input.name.toUpperCase()}</h2>
                    <div className={styles.padDescription}>
                        <div className={styles.imageContainer}>
                            { input.image && !errors.image ? 
                                (<>
                                    <img className={styles.cinta1} src={require(`../../images/cinta2.png`)} alt="cinta"/>
                                    <img className={styles.padImage} src={input.image} alt='img' />
                                </>)
                                : (<img className={styles.padImage} src={require("../../images/dog-unknown.png")} alt='img' />)
                            }
                        </div>
                        <div className={styles.padDetail}>
                            <p className={styles.padSubtitle}>HEIGHT</p>
                            <p className={styles.padData}>
                                {input.height_min ? `${input.height_min}` : null}
                                {input.height_max ? ` - ${input.height_max} cm` : null}
                            </p>
                            <p className={styles.padSubtitle}>Weight</p>
                            <p className={styles.padData}>
                                {input.weight_min ? `${input.weight_min}` : null}
                                {input.weight_max ? ` - ${input.weight_max} kg` : null }
                            </p>
                            <p className={styles.padSubtitle}>Life Span</p> 
                            <p className={styles.padData}>
                                {input.life_span_min ? `${input.life_span_min}` : null}
                                    {input.life_span_max ? ` - ${input.life_span_max} years` : null}
                            </p>
                            <p className={styles.padSubtitle}>Temperaments</p>
                            <p className={styles.padData}>{input.temperamentsName} </p>
                        </div>
                    </div> 
                </div>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.dataSingle}>
                            <label>Breed Name</label><br/>
                            <input className={styles.soloInput} name="name" value={input.value} onChange={handleChange}/><br/>
                            <p className={styles.error}>{errors.name ? errors.name : null}</p>
                        </div>
                        <div className={styles.dataSingle}>
                            <label>Image</label><br/>
                            <input className={styles.soloInput} name="image" value={input.value} onChange={handleChange}/><br/>
                            <p className={styles.error}>{errors.image ? errors.image : null}</p>
                        </div>
                        <div className={styles.dataDouble}>
                            <label>Height (cm)</label><br/>
                            <input className={styles.doubleInputLeft} placeholder='min' name="height_min" value={input.value} onChange={handleChange}/>
                            <input className={styles.doubleInputRight} placeholder='max' name="height_max" value={input.value} onChange={handleChange}/><br/>
                            <div className={styles.errorContainer}>
                                <div className={styles.errorsLeft}>{errors.height_min}</div>
                                <div className={styles.errorsRight}>{errors.height_max}</div>
                            </div>
                        </div>

                        <div className={styles.dataDouble}>
                            <label>Weight (kg)</label><br/>
                            <input className={styles.doubleInputLeft} placeholder='min' name="weight_min" value={input.value} onChange={handleChange}/>
                            <input className={styles.doubleInputRight} placeholder='max' name="weight_max" value={input.value} onChange={handleChange}/><br/>
                            <div className={styles.errorContainer}>
                                <div className={styles.errorsLeft}>{errors.weight_min}</div>
                                <div className={styles.errorsRight}>{errors.weight_max}</div>
                            </div>
                        </div>


                        <div className={styles.dataDouble}>
                            <label>Life Span (years)</label><br/>
                            <input className={styles.doubleInputLeft} placeholder='min' name="life_span_min" value={input.value} onChange={handleChange}/>
                            <input className={styles.doubleInputRight} placeholder='max' name="life_span_max" value={input.value} onChange={handleChange}/><br/>
                            <div className={styles.errorContainer}>
                                <div className={styles.errorsLeft}>{errors.life_span_min}</div>
                                <div className={styles.errorsRight}>{errors.life_span_max}</div>
                            </div>
                        </div>
                        

                        <div className={styles.tempDiv}>
                            <label>Temperaments: </label><br/>
                            <span className={styles.tempSpan}>(hold down Ctrl or Cmd button to select multiple options)</span><br/>
                            <select className={styles.tempSelect} name="temperaments" onChange={handleSelect} multiple={true}>
                                {
                                    allTemperaments.map(temp=>{
                                        return (
                                            <option title={temp.name} value={temp.id} key={temp.id}>{temp.name}</option>
                                        )
                                    })
                                }
                            </select><br/>
                            <p className={styles.error}>{errors.temperaments}</p>
                        </div>
                        { errors.name ? disabled : ( errors.height_max ? disabled : ( errors.height_min ? disabled : ( errors.weight_min ? disabled : ( errors.weight_max ? disabled : ( errors.life_span_min ? disabled : ( errors.life_span_max ? disabled : ( errors.temperaments ? disabled : ( errors.image ? disabled : <button className={styles.submit} type="submit">Create!</button>))))))))}
                    
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Create;