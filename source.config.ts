import { fileGenerator, remarkDocGen } from "fumadocs-docgen"
import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config"

export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkDocGen, { generators: [fileGenerator()] }]],
  },
})
