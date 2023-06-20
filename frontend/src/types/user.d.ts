export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  settings: {
    categories: string[];
    sources: string[];
    authors: string[];
  };
  created_at: string;
  updated_at: string;
}
