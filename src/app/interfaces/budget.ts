import { User } from './user';

export interface Bugdet {
  id?: string;
  user_id?: string;
  responsible?: any;
  approved_id?: string;
  client_id: string;
  client: User;
  products: any[];
  subtotal?: number;
  discounts?: number;
  price?: number;
  status?: string;
  date?: string;
  description?: string;
  approved?: number;
  excludeSolicitation?: boolean;
  comments?: Array<{
    text?: string;
    user?: User;
    date?: Date;
  }>;
  justifications?: Array<{
    text?: string;
    user?: User;
  }>;
  justificationsSale?: Array<{
    text?: string;
    user?: User;
  }>;
}
