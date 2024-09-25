import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
6;

const initialState = {
  product: [],
};
console.log(initialState.product);

export const addProductFirestore = createAsyncThunk(
  "cart/addProductFirestore",
  async (product) => {
    const productRef = await addDoc(collection(fireDB, "products"), product);
    const newProduct = { id: productRef.id, product };
    return newProduct;
  }
);
export const getProductFirestore = createAsyncThunk(
  "cart/getProductFirestore",
  async () => {
    const quarySnapshot = await getDocs(collection(fireDB, "products"));
    const products = quarySnapshot.docs.map((doc) => ({
      id: doc.id,
      product: doc.data(),
    }));
    return products;
  }
);


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteFromCart(state, action) {
      const updatedState = state.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
    incrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    decrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductFirestore.fulfilled, (state, action) => {
        state.product.push(action.payload);
      })
      .addCase(getProductFirestore.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
