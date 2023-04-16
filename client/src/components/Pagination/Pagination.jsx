import React from "react";

import styles from './Pagination.module.css'


const Paginas = ({dogsPerPage, totalDogs, paginate}) => {
    const pageNumbers = [];

    for (let i=1; i<= Math.ceil(totalDogs/dogsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul>
                {pageNumbers.map(page=>(
                    <li onClick={()=>paginate(page)} key={page}>
                        <a href='/home/#'>
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Paginas