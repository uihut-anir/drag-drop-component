import create from "zustand"
import {devtools, persist} from "zustand/middleware"
import { columnsFromBackend } from "./data/data"


let settingsStore = (set) => ({
    dark: false,
    toggleDarkMode: ()=> set((state)=>({
        dark: !state.dark
    }))
})


let columnsStore = (set) => ({
    columns : columnsFromBackend,
    setColumns : () => (
        set((state)=>({
            columns : [...state.columns]
        }))
    )
})


settingsStore = devtools(settingsStore);
settingsStore = persist(settingsStore, {
    name: "user_setting"
})


export const useSettingStore = create(settingsStore);