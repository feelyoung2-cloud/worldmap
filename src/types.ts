export type TabType = 'home' | 'world-map' | 'quiz-challenge' | 'landmarks' | 'my-atlas';

export type ContinentType = 'all' | 'asia' | 'europe' | 'africa' | 'namerica' | 'samerica' | 'oceania' | 'antarctica';

export interface CountryData {
  id: string;
  name: string;
  nameEn: string;
  continent: ContinentType;
  continentName: string;
  subRegion: string;
  capital: string;
  capitalEn: string;
  flagEmoji: string;
  flagUrl: string;
  description: string;
  keyLandmarks: string[];
  photos: {
    title: string;
    url: string;
    caption?: string;
  }[];
  coordinates: { x: number; y: number }; // SVG Map coordinates
  isDiscovered: boolean;
  xpReward: number;
}

export interface LandmarkItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'cities' | 'mountains' | 'rivers-deserts' | 'oceans';
  categoryName: string;
  categoryIcon: string;
  continent: string;
  locationText: string;
  description: string;
  highlightFact: string;
  imgUrl: string;
  relatedCountries: string[];
  progress: number;
  isStamped: boolean;
  mapCoords: { x: number; y: number };
}

export interface FlagMatchItem {
  id: string;
  flagNo: string;
  name: string;
  flagUrl: string;
  alt: string;
}

export interface QuizMatchingQuestion {
  id: string;
  stage: number;
  title: string;
  flags: FlagMatchItem[];
  countries: { id: string; name: string; pronounceText: string }[];
  correctPairs: Record<string, string>; // flagId -> countryId
  successInfo: {
    countryName: string;
    flagEmoji: string;
    continentName: string;
    capital: string;
    title: string;
    description: string;
    xp: number;
  };
}

export interface LocationMissionQuestion {
  id: string;
  targetCountry: string;
  targetCountryEn: string;
  pronunciationText: string;
  subRegion: string;
  flagEmoji: string;
  flagColors: string;
  hints: {
    id: number;
    title: string;
    status: '완료' | '확인 중' | '지도 활성화' | '국기 정보';
    content: string;
  }[];
  landmarks: {
    name: string;
    desc: string;
    imgUrl: string;
  }[];
}

export interface ConfusedPair {
  id: string;
  title: string;
  errorRate: string;
  itemA: {
    name: string;
    flagEmoji: string;
    detail: string;
  };
  itemB: {
    name: string;
    flagEmoji: string;
    detail: string;
  };
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BadgeItem {
  id: string;
  title: string;
  icon: string;
  desc: string;
  description?: string;
  status: '획득 완료' | '진행중';
  progressPercent?: number;
  progressText?: string;
  unlocked?: boolean;
}
