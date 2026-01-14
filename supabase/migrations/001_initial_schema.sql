-- BriefGenius Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  agency_name text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Templates table
create table public.templates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Template sections table
create table public.template_sections (
  id uuid default uuid_generate_v4() primary key,
  template_id uuid references public.templates on delete cascade not null,
  title text not null,
  description text,
  helper_text text,
  order_index integer not null default 0,
  is_required boolean default true
);

-- Briefs table
create table public.briefs (
  id uuid default uuid_generate_v4() primary key,
  template_id uuid references public.templates on delete set null,
  user_id uuid references public.profiles on delete cascade not null,
  client_name text not null,
  client_email text not null,
  project_name text not null,
  access_token text unique not null,
  status text default 'pending' check (status in ('pending', 'in_progress', 'completed', 'approved')),
  generated_content jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone,
  approved_at timestamp with time zone
);

-- Brief responses table
create table public.brief_responses (
  id uuid default uuid_generate_v4() primary key,
  brief_id uuid references public.briefs on delete cascade not null,
  section_id uuid references public.template_sections on delete cascade not null,
  client_answer text not null,
  ai_expanded text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes
create index idx_templates_user_id on public.templates(user_id);
create index idx_template_sections_template_id on public.template_sections(template_id);
create index idx_briefs_user_id on public.briefs(user_id);
create index idx_briefs_access_token on public.briefs(access_token);
create index idx_brief_responses_brief_id on public.brief_responses(brief_id);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.templates enable row level security;
alter table public.template_sections enable row level security;
alter table public.briefs enable row level security;
alter table public.brief_responses enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Templates policies
create policy "Users can view own templates"
  on public.templates for select
  using (auth.uid() = user_id);

create policy "Users can create templates"
  on public.templates for insert
  with check (auth.uid() = user_id);

create policy "Users can update own templates"
  on public.templates for update
  using (auth.uid() = user_id);

create policy "Users can delete own templates"
  on public.templates for delete
  using (auth.uid() = user_id);

-- Template sections policies
create policy "Users can view sections of own templates"
  on public.template_sections for select
  using (
    exists (
      select 1 from public.templates
      where templates.id = template_sections.template_id
      and templates.user_id = auth.uid()
    )
  );

create policy "Users can create sections in own templates"
  on public.template_sections for insert
  with check (
    exists (
      select 1 from public.templates
      where templates.id = template_sections.template_id
      and templates.user_id = auth.uid()
    )
  );

create policy "Users can update sections in own templates"
  on public.template_sections for update
  using (
    exists (
      select 1 from public.templates
      where templates.id = template_sections.template_id
      and templates.user_id = auth.uid()
    )
  );

create policy "Users can delete sections in own templates"
  on public.template_sections for delete
  using (
    exists (
      select 1 from public.templates
      where templates.id = template_sections.template_id
      and templates.user_id = auth.uid()
    )
  );

-- Briefs policies
create policy "Users can view own briefs"
  on public.briefs for select
  using (auth.uid() = user_id);

create policy "Users can create briefs"
  on public.briefs for insert
  with check (auth.uid() = user_id);

create policy "Users can update own briefs"
  on public.briefs for update
  using (auth.uid() = user_id);

create policy "Users can delete own briefs"
  on public.briefs for delete
  using (auth.uid() = user_id);

-- Brief responses policies
create policy "Users can view responses for own briefs"
  on public.brief_responses for select
  using (
    exists (
      select 1 from public.briefs
      where briefs.id = brief_responses.brief_id
      and briefs.user_id = auth.uid()
    )
  );

-- Public access policies for client questionnaire (using service role for mutations)
create policy "Public can view briefs by token"
  on public.briefs for select
  using (true);

create policy "Public can view template sections"
  on public.template_sections for select
  using (true);

create policy "Public can view templates"
  on public.templates for select
  using (true);

create policy "Public can view brief responses"
  on public.brief_responses for select
  using (true);

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, agency_name)
  values (new.id, new.email, split_part(new.email, '@', 1));
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger for templates updated_at
create trigger update_templates_updated_at
  before update on public.templates
  for each row execute procedure public.update_updated_at_column();
