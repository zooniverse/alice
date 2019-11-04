import { createContext } from 'react'
import { AppStore } from './AppStore'

const defaultContext = AppStore && AppStore.create({})

const AppContext = createContext(defaultContext)

export default AppContext
