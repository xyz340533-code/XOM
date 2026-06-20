export type TabType = 'intro' | 'skills' | 'hobbies' | 'friends' | 'collections';

export interface PersonalityTrait {
  label: string;
  value: string;
  detail: string;
}

export interface SkillItem {
  id: string;
  name: string;
  percent: number;
  description: string;
  category: 'code' | 'design' | 'strategy' | 'creative';
  tags: string[];
}

export interface HobbyItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  category: string;
  iconName: string;
  themeId?: string;
}

export interface GuestbookMessage {
  id: string;
  name: string;
  role: string;
  content: string;
  date: string;
  color: string; // Tailwind class background like 'bg-primary/10' or custom borders
  avatarIndex: number;
  resounds?: number;
}

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'book' | 'music' | 'tech' | 'site';
  rating: number; // 1-5 stars
  tags: string[];
  url?: string;
}
