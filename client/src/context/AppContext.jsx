import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";


export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isseler, setIsseler] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartitems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    // fetch all products
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    // add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartitems)

        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }
        setCartItems(cartData)
        toast.success("added to cart")
    }

    // update cart items quantity
    const updateCartItems = (itemId, quantity) => {
        let cartData = structuredClone(cartitems)
         cartData[itemId] = quantity
         setCartItems(cartData)
         toast.success("cart updated")
    }

    // remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartitems)

        if (cartData[itemId]) {
            cartData[itemId] -= 1
            if (cartData[itemId] === 0) {
                delete cartData[itemId]
            }
        }
        toast.success("removed from cart")
        setCartItems(cartData)  
    }
   // get cart item count ---------
    const getCartCount = () => {
        let totalCount = 0
        for (const item in cartitems) {
            totalCount += cartitems[item]
        }
        return totalCount
    }

    // get total cart amount ---------
    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartitems) {
            let itemInfo = products.find((product) => product._id === items)
            if (cartitems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartitems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100
    }
 

    useEffect(() => {
        fetchProducts()
    }, [])
    
       const value = {navigate, user, setUser, isseler, setIsseler, showUserLogin, setShowUserLogin, 
        products, currency, addToCart, updateCartItems, removeFromCart, cartitems, searchQuery, setSearchQuery
        , getCartCount, getCartAmount};

       return <AppContext.Provider value={value}>
        {children}
       </AppContext.Provider> 
}

export const useAppContext = () => {
    return useContext(AppContext);
}