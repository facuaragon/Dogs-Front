import React from "react";
import styles from "./Pagination.module.css"

const Paginas = ({dogsPerPage, totalDogs, paginate}) => {
    let pageNumbers = [];

    for (let i=1; i<= Math.ceil(totalDogs/dogsPerPage); i++){
        pageNumbers.push(i);
    }

    if(pageNumbers.length===1) pageNumbers=[];


    return (
        <nav >
            <ul className={styles.list}>
                {
                    pageNumbers?.map(page=>{
                        return (
                            <li key={page}>
                                <button onClick={()=>paginate(page)}>{page}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Paginas