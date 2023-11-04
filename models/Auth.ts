export interface LoginDTO {
  email: string;
  password: string;
}
export interface LoginRes {
  data: {
    status: string;
    response: string;
  };
}
export interface RegisterDTO extends LoginDTO {
  username: string;
}
export interface RegisterRes {
  data: {
    status: string;
    response: {
      user_id: string;
      username: string;
      email: string;
      success: boolean;
    };
  };
}
