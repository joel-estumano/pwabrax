import { User } from './user';

export interface Support {
  id: string;
  client_id?: string;
  client?: User;
  category?: string;
  observation?: string;
  status?: string;
  createdAt: Date;
  commentaries?: Array<{
    text?: string;
    date?: Date;
    user?: string;
    is_client?: boolean;
  }>;
  comments?: Array<{
    text?: string;
    user?: User;
    date?: Date;
  }>;
}
