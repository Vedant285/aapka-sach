import { defineCliConfig } from 'sanity/cli'

const projectId = 'g1o8uwxq'
const dataset = 'production'

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset,
  }
})