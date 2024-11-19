import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"
import { AppState } from "react-native"
import "react-native-url-polyfill"

const supabaseUrl = ""
const supabaseAnonKey = ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

AppState.addEventListener("change", (State) => {
    if(State === "active"){
        supabase.auth.startAutoRefresh()
    }else{
        supabase.auth.stopAutoRefresh()
    }
})