export interface Problem {
  id: number;
  name: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  day: number;
  url: string;
}

export interface Resource {
  id: string;
  type: 'video' | 'article' | 'exercise' | 'other';
  title: string;
  url: string;
  duration?: string;
  completed?: boolean;
  excalidrawPath?: string;
  addedDate?: string;
}


export interface UsefulLink {
  title: string;
  url: string;
  type?: 'course' | 'academy' | 'repo' | 'blog' | 'other';
}

export interface Subtopic {
  id: string;
  title: string;
  resources: Resource[];
  /** Lista opcional de recursos útiles para este subtema (blogs, cursos, repos, etc.) */
  usefulLinks?: UsefulLink[];
}

export interface Topic {
  id?: string;
  title: string;
  description?: string;
  icon?: string;
  url?: string;
  subtopics: Subtopic[];
}

export interface ProblemProgress {
  solved: boolean;
  solvedDate?: string;
  reviews: boolean[];
  dates: Record<string, string>;
}

export interface TopicProgress {
  completed: boolean;
  completedDate?: string;
  reviews: boolean[];
  dates: Record<string, string>;
  resources?: Record<string, boolean>;
}

export interface ProgressItem {
  completed?: boolean;
  solved?: boolean;
  completedDate?: string;
  solvedDate?: string;
  reviews: boolean[];
  dates: Record<string, string>;
  resources?: Record<string, boolean>;
}

export interface Pattern {
  title: string;
  description: string;
  templates: Record<string, string>;
  problems: string[];
}

export interface InterviewRoadmapItem {
  id: string;
  title: string;
  description: string;
}

export interface InterviewRoadmapSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  items: InterviewRoadmapItem[];
}

export interface DSAMindmapContentItem {
  type: 'info' | 'question' | 'answer' | 'use' | 'note';
  text: string;
}

export interface DSAMindmapSection {
  id: string;
  title: string;
  color: string;
  content: DSAMindmapContentItem[];
}

export interface DSAMindmap {
  title: string;
  description: string;
  sections: DSAMindmapSection[];
}

