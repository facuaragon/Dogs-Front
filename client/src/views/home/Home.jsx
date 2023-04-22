import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllDogs, cleanDetail, getTemperaments, getDogsByName, filterByName, filterByWeight, filterCreatedDog, filterByTemperament, cleanFilters, cleanDogs } from "../../components/redux/actions"

import styles from './Home.module.css'
import Navbar from "../../components/Navbar/Navbar"
import Cards from "../../components/Cards/Cards"
import Pagination from '../../components/Pagination/Pagination'


function Home(){

    const dispatch = useDispatch();
    const allDogs = useSelector((state)=>state.allDogs);
    const allTemperaments = useSelector((state)=>state.temperaments);
    
    const [searchName, setSearchName] = useState('');



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

    const handleSubmit = (event)=>{
        event.preventDefault();
        setCurrentPage(1);
        dispatch(getDogsByName(searchName));
        setSearchName("");
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

    const handlerFilterName = (event) => {
        dispatch(filterByName(event.target.value))
        setCurrentPage(1)
    }

    const handlerFilterWeight = (event) => {
        dispatch(filterByWeight(event.target.value))
        setCurrentPage(1)
        
    }

    function handlerFilterCreated (event) {
        dispatch(filterCreatedDog(event.target.value))
        setCurrentPage(1)
    }

    function handlerFilterTemperament (event) {
        event.preventDefault();
        dispatch(filterByTemperament(event.target.value))
        setCurrentPage(1)
    }

    function handlerFilters () {
        dispatch(cleanFilters())
        setCurrentPage(1)
    }

    return (
        <div className={styles.home}>
            <Navbar handleChange={handleChange} handleSubmit={handleSubmit} handleKeyDown={handleKeyDown} />
            <div className={styles.general}>
                <div className={styles.filters}>
                    <h3>Sorty By:</h3>

                    <div className={styles.group}>
                        <label>Alphabetically: </label>
                        <select  onChange={event => handlerFilterName(event)}>
                            <option key={1} value='A-Z'>A-Z</option>
                            <option key={2} value='Z-A'>Z-A</option>
                        </select>
                    </div>
                    <div className={styles.group}>
                        <label>Dogs Weight: </label>
                        <select  onChange={event => handlerFilterWeight(event)}>
                            <option key={1} value="max_weight">Max</option>
                            <option key={2} value="min_weight">Min</option>
                        </select>
                    </div>
                    <div className={styles.group}>
                        <label>Created By: </label>
                        <select  onChange={event => handlerFilterCreated(event)}>
                            <option key={1} value="all">All</option>
                            <option key={2} value="Created By Users">By Users</option>
                            <option key={3} value="The API Dog">API Dog</option>
                        </select>
                    </div>
                    <div className={styles.group}>
                        <label>Temperament: </label>
                        <select onChange={event => handlerFilterTemperament(event)}>
                            <option key={0} value='All'>All</option>
                            {
                                allTemperaments.map(temp => (
                                    <option value={temp.name} key={temp.id}>{temp.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button onClick={()=>handlerFilters()}>Clean filters</button>
                </div>
                <div className={styles.showing}>
                    <div className={styles.cards}>
                        <Cards dogs={currentDogs} loading={loading}  />
                    </div>
                    <div className={styles.pagination}>
                        <Pagination dogsPerPage={dogsPerPage} totalDogs={allDogs.length} paginate={paginate} />
                    </div>    
                </div>

            </div>

        </div>
    )
}

export default Home;