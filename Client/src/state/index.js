import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    mode:"light",
    user:null,
    token:null,
    wishlist:[],
};

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode==="light" ? "dark" : "light";
        },
        setUser:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        removeUser:(state)=>{
            state.user = null;
            state.token = null;
        },
        addtowishList:(state,action)=>{
            state.wishlist = [...state.wishlist,action.payload.list]
        },
        removedFromList:(state,action)=>{
            state.wishlist = state.wishlist.filter((prod)=>prod._id !== action.payload.id)
        },
        addProductToCart:(state,action)=>{
            const isInCart = state.user.cart.findIndex(item => item._id === action.payload.cart._id);
           if(isInCart === -1){
            state.user.cart = [...state.user.cart,action.payload.cart]
           }
        },
        increaseItemQuantity:(state,action)=>{
            const item = state.user.cart.find(item=>item._id===action.payload.id);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        descreaseItemQuantity:(state,action)=>{
            const item = state.user.cart.find(item=>item._id === action.payload.id);
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        removeProductFromCart:(state,action)=>{
            state.user.cart = state.user.cart.filter((cart)=>cart._id !== action.payload.id)
        },
        clearCart:(state)=>{
            state.user.cart = [];
        }
    }
})

export const {setMode,setUser,removeUser,addtowishList,removedFromList,addProductToCart,removeProductFromCart,increaseItemQuantity,descreaseItemQuantity,clearCart}  = authSlice.actions;
export default authSlice.reducer;
