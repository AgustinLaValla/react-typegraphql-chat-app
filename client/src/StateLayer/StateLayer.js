import React from 'react'
import { getToken } from '../utils/token';
import { initialState, reducer } from './reducer';

const user = getToken();

const DataLayer = React.createContext();

export default function StateLayer({ children }) {
    return (
        <DataLayer.Provider value={React.useReducer(reducer, {
            ...initialState, user: { ...user },
            isAuthenticated: !!user
        })}>
            {children}
        </DataLayer.Provider>
    )
}

export const useStateLayer = () => React.useContext(DataLayer);