import type { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Aaj Ka Sach Content')
    .items([
      ...S.documentTypeListItems(),
    ])
