import {createContext,useReducer,useEffect} from 'react'
import reducers from './Reducers'
import {getData} from '../utils/fetchData'
export const DataContext=createContext();

export const DataProvider =({children}) => {
    const initialState ={notify:{},auth:{}}
    const [state, dispatch] = useReducer(reducers, initialState)

    useEffect(()=>{
        const firstlogin = localStorage.getItem("firstLogin")
        if(firstlogin){
            getData('auth/accessToken').then(res=>
                {if(res.err) return localStorage.remove("firstLogin")

                dispatch({
                    type:"AUTH",
                    payload:{
                        token:res.access_token,
                        user:res.user
                    }
                })
            
            
            })
        }
    },[])
    return(
        <DataContext.Provider value={{state, dispatch}}>
         {children}
        </DataContext.Provider>

    )

    
}
