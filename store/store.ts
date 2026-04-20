import { configureStore } from '@reduxjs/toolkit';
import user from '@reducers/user'

export const store = configureStore({
    reducer: { user },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch