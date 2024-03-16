import { OpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { z } from 'zod'
import { PROMPT_DESCRIPTIONS, PROMPT_TEMPLATE } from '@/constants/ai'
import type { QuestionEntry } from '@/types'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z.string().describe(PROMPT_DESCRIPTIONS.mood),
    subject: z.string().describe(PROMPT_DESCRIPTIONS.subject),
    summary: z.string().describe(PROMPT_DESCRIPTIONS.summary),
    negative: z.boolean().describe(PROMPT_DESCRIPTIONS.negative),
    color: z.string().describe(PROMPT_DESCRIPTIONS.color),
    sentimentScore: z.number().describe(PROMPT_DESCRIPTIONS.sentiment),
  }),
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template: PROMPT_TEMPLATE,
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}

export const analyze = async (content: string) => {
  const input = await getPrompt(content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const result = await model.invoke(input)

  try {
    return parser.parse(result)
  } catch (e) {
    console.error(e)
  }
}

export const qa = async (question: string, entries: QuestionEntry[]) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    })
  })

  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)

  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}
