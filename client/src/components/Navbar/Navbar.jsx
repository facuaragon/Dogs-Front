import styles from './Navbar.module.css'

function Navbar(){
    return (
        <div className={styles.searchBox}>
            <form>
                <input placeholder="Search By Breed" />
                <button>Search</button>
            </form>
        </div>
    )
}

export default Navbar;