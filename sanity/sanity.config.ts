// sanity.config.ts

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'   // ✅ FIXED
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes/index'
import { structure } from './structure'            // ✅ import your custom structure
import { projectId, dataset } from './lib/sanity'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,

  plugins: [
    structureTool({ structure }), 
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],

  schema: {
    types: schemaTypes,
  },
})
