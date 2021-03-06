import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: false,
  selectedGiftList: 0,
  selectedGiftListItem: 0,
  email: "",
  first_name: "",
  last_name: "",
  id: 0,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true
    },
    logout: (state) => {
      state.loggedIn = false
    },
    setSelectedGiftList: (state, action) => {
      state.selectedGiftList = action.payload.id
    },
    setSelectedGiftListItem: (state, action) => {
      state.selectedGiftListItem = action.payload.id
    },
    setUser: (state, action) => {
      state.email = action.payload.email
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.id = action.payload.id
    },
  },
})

export const { login, logout, setUser, setSelectedGiftList,setSelectedGiftListItem } = userSlice.actions

export default userSlice.reducer