/** Соответствует телу API; роль совпадает с entities/user User.role */
export interface RefreshResponse {
  accessToken: string;
  user?: {
    id: string;
    email: string;
    role: 'CANDIDATE' | 'RECRUITER';
  };
}
