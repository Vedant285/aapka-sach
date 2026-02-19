import type { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Aapka Sach Content')
    .items([
      ...S.documentTypeListItems(),
    ])