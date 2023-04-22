import styles from './Detail.module.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import { getDogDetail, cleanDetail} from '../../components/redux/actions';



function Detail(){
    const dispatch = useDispatch();
    const { id } = useParams();
    const dogDetails = useSelector((state)=>state.dogDetail);

    let cinta = Math.floor(Math.random()*2+1);
    let cintaImage = Math.floor(Math.random()*3+1)
    
    useEffect(()=>{
        dispatch( getDogDetail(id) );
        return ( () => {
            dispatch(cleanDetail());
            //dispatch(cleanDogCreated());
        } )
    }, [dispatch] );
    
    const { origin, image, name, weight, height, temperament, life_span} = dogDetails
    
        return (
            <div className={styles.showing}>
                <Navbar />
                
                <div className={styles.padContainer}>
                    {name ? (
                        <>
                            <h2 className={styles.padTitle}>{name.toUpperCase()}</h2>
                            <div className={styles.padDescription}>
                                <img className={cinta === 1 ? styles.cinta1 : (cinta===2 ? styles.cinta2 : styles.cinta1)} src={require(`../../images/cinta${cintaImage}.png`)} alt="cinta"/>
                                <div className={styles.imageContainer}>
                                    <img className={styles.padImage} src={image} alt='img' />
                                </div>
                                <div className={styles.padDetail}>
                                    { origin ? (<><p className={styles.padSubtitle}>ORIGIN</p>
                                    <p className={styles.padData}>{origin}</p></>) : null }
                                    <p className={styles.padSubtitle}>HEIGHT</p>
                                    <p className={styles.padData}>{height} cm</p>
                                    <p className={styles.padSubtitle}>Weight</p>
                                    <p className={styles.padData}>{weight} kg</p>
                                    <p className={styles.padSubtitle}>Life Span</p> 
                                    <p className={styles.padData}>{life_span} </p>
                                    <p className={styles.padSubtitle}>Temperaments</p>
                                    <p className={styles.padData}>{temperament} </p>
                                </div>
                            </div> 
                        </>
                    ) : (
                        <h3 className={styles.padTitle}>Loading...</h3>
                    )}
                </div>

            </div>
        )
   
}

export default Detail;