import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isseler, setIsseler] = useState(false);
    
       const value = {navigate, user, setUser, isseler, setIsseler};

       return <AppContext.Provider value={value}>
        {children}
       </AppContext.Provider> 
}

export const useAppContext = () => {
    return useContext(AppContext);
}