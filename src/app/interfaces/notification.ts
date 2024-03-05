export interface Notification {
  id?: string;
  user_id?: string;
  client_id?: string;
  url?: string;
  type?: string;
  date?: string;
  reminder?: string;
  read?: boolean;
  text?: string;
}
