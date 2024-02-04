import { configureStore } from '@reduxjs/toolkit'
import tagReducer from './features/tagSlice'

export const store = configureStore({
	reducer: {
		tagReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
