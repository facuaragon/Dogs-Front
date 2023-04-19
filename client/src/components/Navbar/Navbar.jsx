import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'


function Navbar({handleSubmit, handleChange, handleKeyDown}){
    
    return (
        <div className={styles.searchBox}>
            <div>
                <Link to={"/home"}>
                    <img src="logo.jpg" alt="logo" className='' />
                </Link>
            </div>
            <form onChange={handleChange} >
                <input type='search' placeholder="Search By Breed" onKeyDown={handleKeyDown}/>
                <button type='submit' onClick={handleSubmit} >Search</button>
            </form>
        </div>
    )
}

export default Navbar;