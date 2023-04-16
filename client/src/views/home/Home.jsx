import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { getAllDogs, cleanDetail, getTemperaments, getDogsByName } from "../../components/redux/actions"

import styles from './Home.module.css'
import Navbar from "../../components/Navbar/Navbar"
import Cards from "../../components/Cards/Cards"
import Pagination from '../../components/Pagination/Pagination'


function Home(){
    
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=>state.allDogs);
    
    const [searchName, setSearchName] = useState('');

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);



    useEffect(()=>{
        const fetchDogs = () => {
            setLoading(true);
            dispatch( getAllDogs() );
            dispatch( getTemperaments() )
            setLoading(false);
        }
        fetchDogs();

        return ( () => {
            cleanDetail();
        } )
    }, [dispatch] );

    // Get current posts
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    // change page
    const paginate = (pageNumber)=>setCurrentPage(pageNumber)
    
    //console.log(allDogs);

    const handleSubmit = async (event)=>{
        event.preventDefault();
        dispatch(getDogsByName(searchName))
    }

    const handleChange = (event) => {
        event.preventDefault();
        setSearchName(event.target.value)
        //console.log(searchName);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <div className={styles.home}>
            <h2 className={styles.homeTitle}>Home Page</h2>
            <Navbar handleChange={handleChange} handleSubmit={handleSubmit} handleKeyDown={handleKeyDown} />
            <Cards dogs={currentDogs} loading={loading}  />
            <Pagination dogsPerPage={dogsPerPage} totalDogs={allDogs.length} paginate={paginate} />

        </div>
    )
}

export default Home;