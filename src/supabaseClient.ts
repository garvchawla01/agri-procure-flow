import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clsnedjxgqhfhahdkavp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsc25lZGp4Z3FoZmhhaGRrYXZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxNDAyMzMsImV4cCI6MjEwNDcxNjIzM30.HE7qaGHDP4KC5HsJvIyALKDlJLPiZ2jCoRMhOJnhDxI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)