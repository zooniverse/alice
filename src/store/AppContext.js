import { createContext } from 'react'
import { AppStore } from './AppStore.js'

const defaultContext = AppStore.create({})

const AppContext = createContext(defaultContext)

export default AppContext
