export default interface User {
  user: string;
  host: string;
  database: string;
  token: string;
  superUser: boolean;
  refresh_token: string;
}
