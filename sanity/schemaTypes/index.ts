import { type SchemaTypeDefinition } from 'sanity'

import post from './post'
import webStory from './webStory' 
// import category from './category' 

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    webStory,
    // category,
  ],
}