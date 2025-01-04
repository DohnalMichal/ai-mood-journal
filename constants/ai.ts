export const FALLBACK_VALUE = 'None'
export const NEUTRAL_COLOR = '#808080'

export const PROMPT_DESCRIPTIONS = {
  mood: `The mood of the person who wrote the journal entry. If the mood is not clear, write "${FALLBACK_VALUE}".`,
  subject: `The subject of the journal entry. If the entry is about a specific topic, write that topic here. If the entry is not about a specific topic, write "${FALLBACK_VALUE}".`,
  summary: `Quick summary of the entire journal entry. If the entry is about a specific topic, summarize the entry in a few sentences. If the entry is not about a specific topic, write "${FALLBACK_VALUE}".`,
  negative:
    'Is the journal entry negative? (i.e. does it contain negative emotions?).',
  color: `A hexidecimal color code that represents the mood of the entry. Example #FCDC2A for yellow representing happiness. If the mood is not clear, write ${NEUTRAL_COLOR}.`,
  sentiment:
    'Sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive. If there are no clear emotions in the journal entry, write 0.',
}

export const PROMPT_TEMPLATE =
  'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions. If the following journal entry is not about a specific topic or it does not make sense, do not summarize it. \n{format_instructions}\n{entry}'
