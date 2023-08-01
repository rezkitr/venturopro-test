import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
    isLoading: true,
    menus: [],
    cartItems: [],
    voucher: null,
};

export const getMenus = createAsyncThunk("data/getMenus", async (thunkAPI) => {
    try {
        const res = await api.get("/menus");
        if (!res.data.datas) throw Error(res.data.message);
        return res.data.datas;
    } catch (error) {
        console.log(error);
    }
});

export const getVoucher = createAsyncThunk(
    "data/getVoucher",
    async (thunkAPI) => {
        const { code } = thunkAPI;
        try {
            const res = await api.get("/vouchers", { params: { kode: code } });
            if (!res.data.datas) throw Error(res.data.message);
            return res.data.datas;
        } catch (error) {
            console.log(error);
        }
    }
);

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const findExistItem = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            if (!findExistItem) {
                state.cartItems.push({
                    ...action.payload,
                    catatan: "",
                    qty: 1,
                });
            } else {
                const updatedCartItems = state.cartItems.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, qty: item.qty + 1 };
                    }
                    return item;
                });
                state.cartItems = updatedCartItems;
            }
        },
        editNote: (state, action) => {
            const updatedCartItems = state.cartItems.map((item) =>
                item.id === action.payload.id
                    ? { ...item, catatan: action.payload.note }
                    : item
            );
            state.cartItems = updatedCartItems;
        },
        addQty: (state, action) => {
            const updatedCartItems = state.cartItems.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, qty: item.qty + 1 };
                } else {
                    return item;
                }
            });
            state.cartItems = updatedCartItems;
        },
        subQty: (state, action) => {
            const updatedCartItems = state.cartItems.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, qty: item.qty - 1 };
                } else {
                    return item;
                }
            });
            state.cartItems = updatedCartItems;
        },
        resetVoucher: (state) => {
            state.voucher = null;
        },
        resetCart: (state) => {
            state.cartItems = [];
        },
    },
    extraReducers: {
        [getMenus.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.menus = action.payload;
        },
        [getVoucher.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.voucher = action.payload;
        },
    },
});

export const { addToCart, addQty, subQty, editNote, resetVoucher, resetCart } =
    dataSlice.actions;

export default dataSlice.reducer;
