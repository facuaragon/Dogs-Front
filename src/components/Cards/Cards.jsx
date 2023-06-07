import styles from './Cards.module.css'
import Card from '../Card/Card'

function Cards({ dogs }){
    return (
        <div className={styles.cardList}>
            { dogs.map( dog => (
                <Card dog={dog} key={dog.id} />
            ))}
        </div>
    )
}

export default Cards;