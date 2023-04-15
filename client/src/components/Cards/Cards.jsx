import styles from './Cards.module.css'
import Card from '../Card/Card'

function Cards({allDogs}){

    const dogsList = allDogs;

    return (
        <div className={styles.cardList}>
            { dogsList?.map( dog => (
                <Card dog={dog} />
            ))}
        </div>
    )
}

export default Cards;