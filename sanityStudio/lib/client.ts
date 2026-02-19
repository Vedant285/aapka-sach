import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'g1o8uwxq', // Replace with your ID if different
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Set to false if you want the very latest news immediately
})