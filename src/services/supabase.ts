import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"
import { AppState } from "react-native"
import "react-native-url-polyfill"

const supabaseUrl = "https://mbtqagauddxemkwmntai.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1idHFhZ2F1ZGR4ZW1rd21udGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTc4MjYsImV4cCI6MjA0NzQ3MzgyNn0.RBVD90iJujXcMl0_Preh6wy4YSgPJjAlV6gbhy33T04"

export const supabase = createClient(supabaseUrl, supabaseAnonKey,{
    auth:{
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
})

AppState.addEventListener("change", (State) => {
    if(State === "active"){
        supabase.auth.startAutoRefresh()
    }else{
        supabase.auth.stopAutoRefresh()
    }
})