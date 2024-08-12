import React, { createContext, useEffect, useState } from "react";

// import all_product from "../Components/Assets/all_product"


export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300 + 1; i++) {
        cart[i] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_product] = useState([]);
    const [CartItems, setCartItems] = useState(getDefaultCart())

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((responce) => responce.json())
            .then((data) => setAll_product(data))

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: "POST",
                headers: {
                    Accept: 'application/from-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: ''
            }).then((responce) => responce.json())
                .then((data) => setCartItems(data))
        }
    }, [])

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: "POST",
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "itemId": itemId })
            }).then((responce) => responce.json())
                .then((data) => console.log(data))
        }
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: "POST",
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "itemId": itemId })
            }).then((responce) => responce.json())
                .then((data) => console.log(data))
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const items in CartItems) {
            if (CartItems[items] > 0) {
                let iteminfo = all_product.find((product) => (product.id === Number(items)))
                totalAmount += iteminfo.new_price * CartItems[items]
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in CartItems) {
            if (CartItems[item] > 0) {
                totalItems += CartItems[item]
            }
        }
        return totalItems;
    }


    const contextValue = { all_product, CartItems, addToCart, getTotalCartAmount, removeFromCart, getTotalCartItems }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider