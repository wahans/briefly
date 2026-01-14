import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function expandBriefAnswer(
  sectionTitle: string,
  sectionDescription: string | null,
  clientAnswer: string,
  projectContext: string
): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are helping create a professional creative brief. A client has provided a brief answer to a questionnaire section. Your job is to expand their answer into detailed, professional brief content while preserving their intent and any specific details they provided.

Project Context: ${projectContext}

Section: ${sectionTitle}
${sectionDescription ? `Section Description: ${sectionDescription}` : ''}

Client's Answer: "${clientAnswer}"

Please expand this into 2-3 well-written paragraphs that would be appropriate for a professional creative brief. Maintain the client's voice and intent while adding professional polish and completeness. Do not add information that contradicts what they provided, but you may elaborate on standard considerations for this type of section.

Write only the expanded content, no introductions or meta-commentary.`
      }
    ]
  })

  const textBlock = message.content.find(block => block.type === 'text')
  return textBlock ? textBlock.text : clientAnswer
}

export async function generateBriefSummary(
  projectName: string,
  sections: Array<{ title: string; content: string }>
): Promise<string> {
  const sectionsText = sections
    .map(s => `## ${s.title}\n${s.content}`)
    .join('\n\n')

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `Based on the following creative brief sections, write a concise executive summary (2-3 paragraphs) that captures the key objectives, target audience, and deliverables for this project.

Project: ${projectName}

${sectionsText}

Write only the executive summary, no headers or meta-commentary.`
      }
    ]
  })

  const textBlock = message.content.find(block => block.type === 'text')
  return textBlock ? textBlock.text : ''
}
