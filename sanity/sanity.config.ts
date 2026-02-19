import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure' // ✅ FIXED: Import from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes' 
import { structure } from './structure' 
import { projectId, dataset } from './lib/sanity'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,

  plugins: [
    structureTool({ structure }), // ✅ This uses the imported tool with your custom structure
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],

  schema: {
    types: schemaTypes,
  },
})