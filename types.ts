
export interface WebsitePlan {
  overview: {
    type: string;
    audience: string;
    style: string;
    theme: string;
    priority: string;
  };
  navigation: string[];
  pages: {
    title: string;
    content: Record<string, any>;
  }[];
  designNotes: {
    font: string;
    layout: string;
    spacing: string;
  };
  nextSteps: string[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
