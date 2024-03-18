import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root",
    initialState: {
        to_do: "Todo",
        when: "When",
        where: "Where",
        w_who: "With Who",
        how_long: "How Long"
    },
    reducers: {
        chooseTodo: (state, action) => { state.to_do = action.payload},
        chooseWhen: (state, action) => { state.when = action.payload},
        chooseWhere: (state, action) => { state.where = action.payload},
        chooseW_who: (state, action) => { state.w_who = action.payload},
        chooseHow_long: (state, action) => { state.how_long = action.payload}
        // chooseFirst: (state, action) => { state.first = action.payload},
        // chooseLast: (state, action) => { state.last = action.payload},
        // chooseEmail: (state, action) => { state.email = action.payload},
        // choosePhone: (state, action) => { state.phone_number = action.payload},
        // chooseAddress: (state, action) => { state.address = action.payload}
    }
})

export const reducer = rootSlice.reducer;
export const { chooseTodo, chooseWhen, chooseWhere, chooseW_who, chooseHow_long} = rootSlice.actions