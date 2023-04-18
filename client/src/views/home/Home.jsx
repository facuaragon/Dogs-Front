import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



import { getAllDogs, cleanDetail, getTemperaments, getDogsByName, filterByName, filterByWeight, filterCreatedDog, filterByTemperament, cleanFilters } from "../../components/redux/actions"

import styles from './Home.module.css'
import Navbar from "../../components/Navbar/Navbar"
import Cards from "../../components/Cards/Cards"
import Pagination from '../../components/Pagination/Pagination'


function Home(){

    const dispatch = useDispatch();
    const allDogs = useSelector((state)=>state.allDogs);
    const allTemperaments = useSelector((state)=>state.temperaments);
    
    const [searchName, setSearchName] = useState('');

    const [order, setOrder] = useState("")

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
        //console.log(searchName);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    }

    const handlerFilterName = (event) => {
        dispatch(filterByName(event.target.value))
        setCurrentPage(1)
        setOrder(`Ordered ${event.target.value}`)
    }

    const handlerFilterWeight = (event) => {
        dispatch(filterByWeight(event.target.value))
        setCurrentPage(1)
        setOrder(`Ordered ${event.target.value}`)
        
    }

    function handlerFilterCreated (event) {
        dispatch(filterCreatedDog(event.target.value))
        setCurrentPage(1)
        setOrder(`Ordered ${event.target.value}`)
    }

    function handlerFilterTemperament (event) {
        event.preventDefault();
        dispatch(filterByTemperament(event.target.value))
        setCurrentPage(1)
        setOrder(`Ordered ${event.target.value}`)
    }

    function handlerFilters () {
        dispatch(cleanFilters())
        setCurrentPage(1)
        setOrder('Clean Filters')
    }

    return (
        <div className={styles.home}>
            <h2 className={styles.homeTitle}>Home Page</h2>
            <Navbar handleChange={handleChange} handleSubmit={handleSubmit} handleKeyDown={handleKeyDown} />
            <Link to="/create">
                <button>Create a new Dog!</button>
            </Link>
            <label>Sort by name: </label>
            <select  onChange={event => handlerFilterName(event)}>
                <option key={1} value='A-Z'>A-Z</option>
                <option key={2} value='Z-A'>Z-A</option>
            </select>
            <label>Sort by weight: </label>
            <select  onChange={event => handlerFilterWeight(event)}>
                <option key={1} value="max_weight">Max</option>
                <option key={2} value="min_weight">Min</option>
            </select>
            <label>Sort by Created: </label>
            <select  onChange={event => handlerFilterCreated(event)}>
                <option key={1} value="all">All</option>
                <option key={2} value="Created By Users">Created By Users</option>
                <option key={3} value="The API Dog">The API Dog</option>
            </select>
            <label>Sort by Temperament: </label>
            <select onChange={event => handlerFilterTemperament(event)}>
                <option key={0} value='All'>All</option>
                {
                    allTemperaments.map(temp => (
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                    ))
                }
            </select>
            <button onClick={()=>handlerFilters()}>Clean filters</button>
            <Cards dogs={currentDogs} loading={loading}  />
            <Pagination dogsPerPage={dogsPerPage} totalDogs={allDogs.length} paginate={paginate} />

        </div>
    )
}

export default Home;