export const PROMPT_DESCRIPTIONS = {
  mood: 'The mood of the person who wrote the journal entry.',
  subject: 'The subject of the journal entry.',
  summary: 'Quick summary of the entire journal entry.',
  negative:
    'Is the journal entry negative? (i.e. does it contain negative emotions?).',
  color:
    'A hexidecimal color code that represents the mood of the entry. Example #FCDC2A for yellow representing happiness.',
  sentiment:
    'Sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.',
}

export const PROMPT_TEMPLATE =
  'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}'
