'use client';

import * as React from 'react';

import { SupabaseClient } from '@supabase/supabase-js';
import supabase from '@/lib/supabase/frontend-client';




export interface SupabaseContextValue {
  supabaseClient: SupabaseClient | undefined
}

interface MessageOptions {
  type: string;
  title: string;
  body:string;
}


export const SupabaseContext = React.createContext<SupabaseContextValue>({
  supabaseClient: undefined
});

export interface SupabaseProviderProps {
  children: React.ReactNode;
}

export function SnackbarProvider({ children }: SupabaseProviderProps): React.JSX.Element {

  return <SupabaseContext.Provider value={{ supabaseClient: supabase }}>
    {children}</SupabaseContext.Provider>;
}

export const useSupabase = () => {
  return React.useContext(SupabaseContext)
}
