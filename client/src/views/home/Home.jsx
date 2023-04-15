import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { getAllDogs, cleanDetail, getTemperaments } from "../../components/redux/actions"


import styles from './Home.module.css'
import Navbar from "../../components/Navbar/Navbar"
import Cards from "../../components/Cards/Cards"


function Home(){
    
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=>state.allDogs);
    
    const [filtered, useFiltered] = useState(allDogs);
    const [searchString, setSearchString] = useState('');
    

    useEffect(()=>{
        dispatch( getAllDogs() );
        dispatch( getTemperaments() )
        return ( () => {
            cleanDetail();
        } )
    }, [dispatch] );

    return (
        <div className={styles.home}>
            <h2 className={styles.homeTitle}>Home Page</h2>
            <Navbar />
            <Cards allDogs={allDogs} />

        </div>
    )
}

export default Home;