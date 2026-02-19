import { defineConfig } from 'sanity'
// ✅ FIXED: Import directly from the package name, NOT the file path
import { structureTool } from 'sanity/structure' 
import { visionTool } from '@sanity/vision'

// ✅ Since this file is already inside the /sanity folder, 
// these local imports should use './'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure' 
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