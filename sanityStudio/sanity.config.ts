'use client'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schema } from './schemaTypes' 
import { structure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'Aapka Sach Admin',
  basePath: '/studio',
  projectId: 'g1o8uwxq', 
  dataset: 'production',
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
  schema: schema,
})