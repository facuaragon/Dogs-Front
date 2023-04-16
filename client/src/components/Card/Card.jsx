import styles from './Card.module.css'
import {Link} from 'react-router-dom'

function Card({dog}){

    
    const { id, image, name, temperament, weight } = dog;

    return (
        <div className={styles.cardContainer}>
        <Link to={`/home/${id}`}>
            <h2 className={styles.title}>{name}</h2>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={image} alt='img' />
            </div>
            <p>Weight: {weight} kg</p>
            <p>Temperaments: {temperament} </p>
        </Link>    
        </div>
    )
}

export default Card;