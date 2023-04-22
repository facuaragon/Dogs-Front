import styles from './Card.module.css'
import {Link} from 'react-router-dom'

function Card({dog}){

    let cinta = Math.floor(Math.random()*2+1);
    let cintaImage = Math.floor(Math.random()*3+1)
    
    const { id, image, name, temperament, weight } = dog;

    return (
        <div className={styles.padContainer}>
        <Link to={`/home/${id}`}>           
            <h2 className={styles.padTitle}>{name.toUpperCase()}</h2>
            <div className={styles.padDescription}>
                <img className={cinta === 1 ? styles.cinta1 : (cinta===2 ? styles.cinta2 : styles.cinta1)} src={require(`../../images/cinta${cintaImage}.png`)} alt="cinta"/>
                <div className={styles.imageContainer}>
                    <img className={styles.padImage} src={image} alt='img' />
                </div>
                <div className={styles.padDetail}>
                    <p className={styles.padSubtitle}>Weight</p>
                    <p className={styles.padData}>{weight} kg</p>
                    <p className={styles.padSubtitle}>Temperaments</p>
                    <p className={styles.padData}>{temperament} </p>
                </div>
            </div> 

        </Link>    
        </div>
    )
}

export default Card;