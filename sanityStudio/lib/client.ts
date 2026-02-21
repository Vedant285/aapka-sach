import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url' // You may need to run 'npm install @sanity/image-url'

export const client = createClient({
  projectId: 'g1o8uwxq', 
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, 
})

// ✅ This part turns raw Sanity image data into a real URL for your <img> tags
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}