import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllDogs, cleanDetail, getTemperaments, filterByName, filterByWeight, filterCreatedDog, filterByTemperament, cleanDogs } from "../../components/redux/actions"

import styles from './Home.module.css'
import Navbar from "../../components/Navbar/Navbar"
import Cards from "../../components/Cards/Cards"
import Pagination from '../../components/Pagination/Pagination'


function Home(){

    const dispatch = useDispatch();
    const allDogs = useSelector((state)=>state.allDogs);
    const allTemperaments = useSelector((state)=>state.temperaments);
    
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);

    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    
    // change page
    const paginate = (pageNumber)=>setCurrentPage(pageNumber)

    useEffect(()=>{
        setLoading(true);

        dispatch( getAllDogs() );
        dispatch( getTemperaments() )
        setLoading(false);
        return ( () => {
            dispatch(cleanDetail());
            dispatch(cleanDogs());
        } )
    }, [dispatch] );



    const handlerFilterName = (event) => {
        dispatch(cleanDogs());
        dispatch(filterByName(event.target.value))
        setCurrentPage(1)
    }

    const handlerFilterWeight = (event) => {
        dispatch(cleanDogs());
        dispatch(filterByWeight(event.target.value))
        setCurrentPage(1)
        
    }

    function handlerFilterCreated (event) {
        dispatch(cleanDogs());
        dispatch(filterCreatedDog(event.target.value))
        setCurrentPage(1)
    }

    function handlerFilterTemperament (event) {
        event.preventDefault();
        dispatch(cleanDogs());
        dispatch(filterByTemperament(event.target.value))
        setCurrentPage(1)
    }

    function handlerFilters () {
        dispatch(cleanDogs());
        dispatch(getAllDogs())
        setCurrentPage(1)
    }

    return (
        <div className={styles.home}>
            <Navbar paginate={paginate}/>
            <div className={styles.general}>
                <div className={styles.filters}>
                    <h3 className={styles.sortTitle}>SORT BY:</h3>
                    <form>
                        <div className={styles.group}>
                            <label>Alphabetically: </label>
                            <select  onChange={event => handlerFilterName(event)}>
                                <option selected="selected">Select</option>
                                <option key={1} value='A-Z'>A-Z</option>
                                <option key={2} value='Z-A'>Z-A</option>
                            </select>
                        </div>
                        <div className={styles.group}>
                            <label>Dogs Weight: </label>
                            <select  onChange={event => handlerFilterWeight(event)}>
                                <option selected="selected">Select</option>
                                <option key={1} value="max_weight">Max</option>
                                <option key={2} value="min_weight">Min</option>
                            </select>
                        </div>
                        <div className={styles.group}>
                            <label>Created By: </label>
                            <select  onChange={event => handlerFilterCreated(event)}>
                                <option selected="selected">Select</option>
                                <option key={1} value="all">All</option>
                                <option key={2} value="Created By Users">By Users</option>
                                <option key={3} value="The API Dog">API Dog</option>
                            </select>
                        </div>
                        <div className={styles.group}>
                            <label>Temperament: </label>
                            <select onChange={event => handlerFilterTemperament(event)}>
                                <option selected="selected">Select</option>
                                <option key={0} value='All'>All</option>
                                {
                                    allTemperaments.map(temp => (
                                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button type="reset" onClick={()=>handlerFilters()} className={styles.button_container}>
                                <img src={require("../../images/clean-button.png")} alt="clean" className={styles.button}  />
                        </button>
                    </form>
                </div>
                <div className={styles.showing}>
                    <div className={styles.cards}>
                        <Cards dogs={currentDogs} loading={loading}  />
                    </div>
                    <div className={styles.pagination}>
                        <Pagination dogsPerPage={dogsPerPage} totalDogs={allDogs.length} paginate={paginate} currentPage={currentPage}/>
                    </div>    
                </div>

            </div>

        </div>
    )
}

export default Home;