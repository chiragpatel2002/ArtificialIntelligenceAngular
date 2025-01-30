export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home'
      }
    ]
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'groq-ai',
        title: 'Groq AI',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'groq-ai-chat',
            title: 'Groq AI Chat',
            type: 'item',
            url: '/groq-ai/chat'
          }
        ]
      },
      {
        id: 'ollama-ai',
        title: 'Ollama AI',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'ollama-ai-chat',
            title: 'Ollama AI Chat',
            type: 'item',
            url: '/ollama-ai/chat'
          },
          {
            id: 'ollama-ai-generate',
            title: 'Ollama AI Generate',
            type: 'item',
            url: '/ollama-ai/generate'
          }
        ]
      }
    ]
  }
];
