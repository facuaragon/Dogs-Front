import styles from './Detail.module.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";


import { getDogDetail } from '../../components/redux/actions';
import { cleanDetail } from '../../components/redux/actions';

function Detail(){
    const dispatch = useDispatch();
    const { id } = useParams();
    const dogDetails = useSelector((state)=>state.dogDetail);
    
    useEffect(()=>{
        dispatch( getDogDetail(id) );
        return ( () => {
            cleanDetail();
        } )
    }, [dispatch] );
    
    console.log(id);
    console.log(dogDetails);

    const { image, name, weight, height, temperament, life_span} = dogDetails



    return (
        <div className={styles.cardContainer}>
            <h2 className={styles.title}>{name}</h2>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={image} alt='img' />
            </div>
            <p>Weight: {weight} kg</p>
            <p>Height: {height} kg</p>
            <p>Life Span: {life_span} kg</p>
            <p>Temperaments: {temperament} </p>   
        </div>
    )
}

export default Detail;