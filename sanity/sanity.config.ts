// sanity.config.ts

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes/index' 
import { projectId, dataset } from './lib/sanity'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
  schema: {
    types: schemaTypes,
  },
})