export interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'agent';
}

export interface ThemeConfig {
  isDarkMode: boolean;
  toggleTheme: () => void;
}