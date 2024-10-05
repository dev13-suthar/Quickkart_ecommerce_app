import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./state/index.js" 
import { loadStripe } from '@stripe/stripe-js'; 
import { Elements } from '@stripe/react-stripe-js';
import {Provider} from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"
import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {key:"root",storage,version:1};
const persistedReducer = persistReducer(persistConfig,AuthReducer);
const stripePromise = loadStripe('pk_test_51Og4CySBp6uwL0aNxOtgCo6H0KVi5MUgzPHXBad5u65Lin0zVgCxq9eG7BqHPoOyYQbCUfjOsKARJKAVU0Ak14vf008AZV28aH');


const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=> 
    getDefaultMiddleware({
      serializableCheck:{
        ignoreActions:[FLUSH,PERSIST,PAUSE,REHYDRATE,REGISTER,PURGE]
      },
    })
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <Elements stripe={stripePromise}>
    <App />
    </Elements>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
