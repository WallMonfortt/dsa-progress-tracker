// Problem types
export interface Problem {
  id: number;
  name: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  day: number;
  url: string;
}

// Topic types
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

export interface Subtopic {
  id: string;
  title: string;
  resources: Resource[];
}

export interface Topic {
  id: string;
  title: string;
  description?: string;
  subtopics: Subtopic[];
}

// Progress types
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

// Pattern types
export interface Pattern {
  title: string;
  description: string;
  templates: Record<string, string>;
  problems: string[];
}

// Interview roadmap types
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

// DSA Mindmap types
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

