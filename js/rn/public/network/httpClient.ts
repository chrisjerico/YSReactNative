import axios, { AxiosRequestConfig } from 'axios'
import AppDefine from '../define/AppDefine';
import { Platform } from 'react-native';
import { OCHelper } from '../define/OCHelper/OCHelper';
import { ANHelper, NativeCommand } from '../define/ANHelper/ANHelper';
import { HomeGamesModel } from './Model/HomeGamesModel';
interface Dictionary {
    [x: string]: any;
}
interface CustomAxiosConfig extends AxiosRequestConfig {
    isEncrypt?: boolean
}
export const httpClient = axios.create({
    baseURL: `${AppDefine.host}/wjapp`,
    timeout: 1000,
    headers: { 'Content-Type': 'application/json', }
});
const publicParams = {
    // 公共参数
    // able: "123"
};
const encryptParams = async (params: Dictionary, isEncrypt): Promise<Dictionary> => {
    if (!isEncrypt) {
        return new Promise(resolve => resolve(params));
    }
    var temp = Object.assign({}, params);
    temp['checkSign'] = 1;
    if (Platform.OS == 'ios') {
        return OCHelper.call('CMNetwork.encryptionCheckSign:', [temp]);
    } else {
        return ANHelper.call(NativeCommand.ENCRYPTION_PARAMS, { params: params });
    }
}
httpClient.interceptors.request.use(async (config: CustomAxiosConfig) => {
    const params = Object.assign({}, publicParams, config.params);
    const { isEncrypt = true } = config
    const encryptData = await encryptParams(params, isEncrypt)
    if (isEncrypt) {
        if (Platform.OS == 'ios') {
            if (config.method == 'get' || config.method == 'GET') {
                config.url += '&checkSign=1'
                Object.keys(encryptData).map((res) => {
                    if (!config.params) {
                        config.params = {}
                    }
                    config.params[res] = encryptData[res]
                })
            }

        }
    }
    return config
})
