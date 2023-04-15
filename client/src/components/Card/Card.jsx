import styles from './Card.module.css'

function Card({dog}){

    
    const { image, name, temperament, weight } = dog;

    return (
        <div className={styles.cardContainer}>
            <h2 className={styles.title}>{name}</h2>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={image} alt='img' />
            </div>
            <p>Weight: {weight} kg</p>
            <p>Temperaments: {temperament} </p>
        </div>
    )
}

export default Card;