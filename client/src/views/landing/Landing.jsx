import { Link } from 'react-router-dom';
import styles from './Landing.module.css'

function Landing(){
    return (
        <div className={styles.landingPage}>
            <div className={styles.backgroundImage}></div>
            <button className={styles.button}>
                <Link to="/home">
                    <img src={require("../../images/TRYIT.png")} alt="create" className={styles.logo} />
                </Link>
                </button>
        </div>
    )
}
export default Landing;