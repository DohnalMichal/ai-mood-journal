import { OpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import { z } from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('The mood of the person who wrote the journal entry.'),
    subject: z.string().describe('The subject of the journal entry.'),
    summary: z.string().describe('Quick summary of the entire journal entry.'),
    negative: z
      .boolean()
      .describe(
        'Is the journal entry negative? (i.e. does it contain negative emotions?).',
      ),
    color: z
      .string()
      .describe(
        'A hexidecimal color code that represents the mood of the entry. Example #FCDC2A for yellow representing happiness.',
      ),
  }),
)

const getPrompt = async (content: string) => {
  const formattedInstructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{formattedInstructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { formattedInstructions },
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
