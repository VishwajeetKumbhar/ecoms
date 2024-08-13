import React, { useEffect, useState } from 'react'
import "./Popular.css";
import Item from '../Items/Item';

const Popular = () => {
    const [popularProducts, setPopularProducts] = useState([])

    const url = "https://ecoms-backend-8aek.onrender.com/"

    useEffect(() => {
        fetch(`${url}popularinwomen`)
            .then((responce) => responce.json())
            .then((data) => setPopularProducts(data))
    }, [])
    return (
        <div className='popular'>
            <h1> POPULAR IN WOMEN </h1>
            <hr />
            <div className='popular-item'>
                {
                    popularProducts.map((item, i) => {
                        return <Item
                            key={i}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price} />
                    })
                }
            </div>
        </div>
    )
}

export default Popular