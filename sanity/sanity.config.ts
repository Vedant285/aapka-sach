import { defineConfig } from 'sanity'
// 1. IMPORT FROM THE LIBRARY (The code that makes the sidebar work)
import { structureTool } from '../sanity/node_modules/sanity/lib/structure' 
import { visionTool } from '@sanity/vision'

// 2. IMPORT FROM YOUR FOLDERS (Your custom news layout)
import { schemaTypes } from './schemaTypes'
import { structure } from './structure' 
import { projectId, dataset } from './lib/sanity'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,

  plugins: [
    // We use the library tool and pass your custom structure into it
    structureTool({ structure }), 
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],

  schema: {
    types: schemaTypes,
  },
})