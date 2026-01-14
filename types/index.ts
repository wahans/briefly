export interface Profile {
  id: string
  agency_name: string | null
  created_at: string
}

export interface Template {
  id: string
  user_id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface TemplateSection {
  id: string
  template_id: string
  title: string
  description: string | null
  helper_text: string | null
  order_index: number
  is_required: boolean
}

export interface Brief {
  id: string
  template_id: string
  user_id: string
  client_name: string
  client_email: string
  project_name: string
  access_token: string
  status: 'pending' | 'in_progress' | 'completed' | 'approved'
  generated_content: Record<string, string> | null
  created_at: string
  completed_at: string | null
  approved_at: string | null
}

export interface BriefResponse {
  id: string
  brief_id: string
  section_id: string
  client_answer: string
  ai_expanded: string | null
  created_at: string
}

export interface BriefWithTemplate extends Brief {
  template: Template
  sections?: TemplateSection[]
}

export interface BriefWithResponses extends Brief {
  responses: BriefResponse[]
  template: Template & { sections: TemplateSection[] }
}

export type TemplateWithSections = Template & {
  sections: TemplateSection[]
}
