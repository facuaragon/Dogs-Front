import { Link } from 'react-router-dom';
import styles from './Landing.module.css'

function Landing(){
    return (
        <div className={styles.landingPage}>
            <div className={styles.backgroundImage}></div>
            <h1 className={styles.title}>Título de la Landing Page</h1>
            <Link to="/home">
                    <button className={styles.button}>Try It!</button>
            </Link>
        </div>
    )
}

export default Landing;