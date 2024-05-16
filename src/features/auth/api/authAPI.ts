import { AxiosResponse } from 'axios'
import { instance } from 'common/api'
import {BaseResponseType} from "common/type";
import {LoginParamsType, MeAuthType} from "features/auth/api/authAPI.types";

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<
        BaseResponseType<{ userId?: number }>,
      AxiosResponse<BaseResponseType<{ userId?: number }>>,
      LoginParamsType
    >('auth/login', data)
  },
  logout() {
    return instance.delete<BaseResponseType>('auth/login')
  },
  meAuth() {
    return instance.get<BaseResponseType<MeAuthType>>('auth/me')
  },
  captcha() {
    return instance.get<{ url: string }>(`security/get-captcha-url`)
  }
}


