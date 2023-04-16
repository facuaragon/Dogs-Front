import styles from './Navbar.module.css'

function Navbar({handleSubmit, handleChange, handleKeyDown}){
    return (
        <div className={styles.searchBox}>
            <form onChange={handleChange} >
                <input type='search' placeholder="Search By Breed" onKeyDown={handleKeyDown}/>
                <button type='submit' onClick={handleSubmit} >Search</button>
            </form>
        </div>
    )
}

export default Navbar;