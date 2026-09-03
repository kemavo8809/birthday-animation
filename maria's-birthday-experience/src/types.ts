export type ScreenId =
  | 'welcome'
  | 'pin'
  | 'unlock_confirmed'
  | 'envelope'
  | 'card_intro'
  | 'timeline'
  | 'photo_album'
  | 'memory_cards'
  | 'reasons'
  | 'quiz'
  | 'letter'
  | 'celebration'
  | 'final_gift'
  | 'replay';

export type AspectRatioType = 'square' | 'portrait' | 'landscape' | 'flexible';

export interface PhotoItem {
  id: string;
  src?: string;
  placeholderLabel: string;
  category: string;
  caption?: string;
  date?: string;
  location?: string;
  aspectRatio?: AspectRatioType;
  focalPoint?: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  text: string;
  imagePlaceholder: string;
  imageSrc?: string;
  isWeddingMilestone?: boolean;
}

export interface MemoryCardItem {
  id: string;
  title: string;
  revealedText: string;
  tag: string;
  imagePlaceholder?: string;
  imageSrc?: string;
}

export interface ReasonItem {
  id: number;
  title: string;
  description: string;
  accentIcon?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  correctMessage: string;
  cuteWrongMessage: string;
}

export interface BirthdayConfig {
  recipientName: string;
  birthdayDate: string;
  weddingDate: string;
  secretPin: string;
  acceptedPins: string[];
  introTitle: string;
  introSubtitle: string;
  introMessage: string;
  weddingMemoryText: string;
  birthdayLetterParagraphs: string[];
  finalGiftMessage: string[];
  photos: PhotoItem[];
  timeline: TimelineItem[];
  memories: MemoryCardItem[];
  reasons: ReasonItem[];
  quiz: QuizQuestion[];
}
