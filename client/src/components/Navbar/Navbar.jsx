import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useLocation } from 'react-router-dom';


function Navbar({handleSubmit, handleChange, handleKeyDown}){
    let {pathname} = useLocation();
    
    return (
        <div className={styles.nav_container}>
            <nav className={styles.nav}>
                <div className={styles.navbar}>
                    <div className={styles.logo_container}>
                        <Link to={"/home"}>
                            <img src={require("../../images/logo.jpg")} alt="logo" className={styles.logo} />
                        </Link>
                    </div>
                    <div>
                        { pathname ==="/create" ? null :
                            <Link to={'/create'}>
                                <button className={styles.create_button}>Create New Dog</button>
                            </Link>
                        }

                    </div>
                    { pathname === "/home" ? (
                        <form onChange={handleChange} className={styles.group} >
                        <input type='search' placeholder="Search By Breed" onKeyDown={handleKeyDown} className={styles.input}/>
                        <button type='submit' onClick={handleSubmit} className={styles.search}>Search</button>
                    </form>
                    ) : null }
                    
                </div>
            </nav>
        </div>
    )
}

export default Navbar;