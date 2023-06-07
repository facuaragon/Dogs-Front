import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getDogsByName } from '../redux/actions';
import { useState } from 'react';

function Navbar({paginate}){
    let {pathname} = useLocation();
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');

    const handleSubmit = (event)=>{
        event.preventDefault();
        if(!searchName){
            return;
        }
        if(!/^[a-zA-Z ]+$/.test(searchName)){
            alert("Letters Only")
        }else{
            dispatch(getDogsByName(searchName));
            setSearchName("");
            paginate(1);
        }
    }

    const handleChange = (event) => {
        event.preventDefault();
        setSearchName(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    }
    return (
        <div className={styles.nav_container}>
            <nav className={styles.nav}>
                <div className={styles.navbar}>
                <div className={styles.logo_container}>
                        <img src={require("../../images/LOGO.png")} alt="home" className={styles.logo} />
                    </div>
                    <div className={styles.logo_container1}>
                        <Link to={"/home"}>
                            <img src={require("../../images/home-button.png")} alt="home" className={styles.logo} />
                        </Link>
                    </div>
                    <div className={styles.logo_container2}>
                        { pathname ==="/create" ? null :
                            <Link to={'/create'}>
                                <img src={require("../../images/create-button.png")} alt="create" className={styles.logo} />
                            </Link>
                        }
                    </div>
                    { pathname === "/home" ? (
                        <form onChange={handleChange} className={styles.group} >
                            <button type='submit' onClick={handleSubmit} className={styles.logo_container3}>
                                <img src={require("../../images/search-button.png")} alt="search" className={styles.logo} />
                            </button>
                            <input type='search' placeholder="Search By Breed" onKeyDown={handleKeyDown} className={styles.input}/>
                        </form>) : null 
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar;