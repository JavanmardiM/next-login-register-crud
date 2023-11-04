import { LoginDTO, LoginRes, RegisterDTO, RegisterRes } from "@/models/Auth";
import { BehaviorSubject } from "rxjs";
import _axios from "axios";
import { CONST } from "@/Utilities/CONST";

const instance = _axios.create({
  baseURL: CONST.baseURL,
});
const userSubject = new BehaviorSubject(
  typeof window !== "undefined" && JSON.parse(localStorage.getItem("token") as string)
);

const authService = {
  instance: instance,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },

  login(payload: LoginDTO): Promise<LoginRes> {
    return instance.post(`/api/auth/login`, payload);
  },
  register(payload: RegisterDTO): Promise<RegisterRes> {
    return instance.post(`/api/auth/register`, payload);
  },
};
export default authService;
