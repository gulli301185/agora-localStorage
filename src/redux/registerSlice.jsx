import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
6;

const initialState = {
  users: [],
};
console.log(initialState.users);

export const userSignupFirebase = createAsyncThunk(
  "user/userSignupFirebase",
  async (user) => {
    const productRef = await addDoc(collection(fireDB, "user"), user);
    const newUser = { id: productRef.id, user };
    return newUser;
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


export const registerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignupFirebase.fulfilled, (state, action) => {
        state.product.push(action.payload);
      })
      .addCase(userSignupFirebase.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
} = registerSlice.actions;

export default registerSlice.reducer;


// try {
//     const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);
//     const user = {
//         name: userSignup.name,
//         email: users.user.email,
//         uid: users.user.uid,
//         role: userSignup.role,
//         time: Timestamp.now(),
//         date: new Date().toLocaleString(
//             "en-US",
//             {
//                 month: "short",
//                 day: "2-digit",
//                 year: "numeric",
//             }
//         )
//     }

//     // create user Refrence
//     const userRefrence = collection(fireDB, "user")

//     // Add User Detail
//     addDoc(userRefrence, user);

//     setUserSignup({
//         name: "",
//         email: "",
//         password: ""
//     })

//     toast.success("Signup Successfully");

//     setLoading(false);
//     navigate('/login')
// } catch (error) {
//     console.log(error);
//     setLoading(false);
// }

// }