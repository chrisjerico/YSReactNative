import AppDefine from "../../../js/rn/公共类/AppDefine";
import {NativeCommand} from "../site/NativeCommand";
import {ugError, ugLog} from "../utils/UgLog";
import {anyNull, textEmpty} from "../utils/Ext";

/**
 * http 请求
 * @param params json对象参数
 * @param url 相对地址
 * @param post  是否post请求，默认是
 * @constructor
 */
export default async function ServerHttp(params: object, url: string, post = true) {

  //得到host
  const baseUrl = await AppDefine.ocHelper.executeCmd(JSON.stringify({
    type: NativeCommand.APP_HOST,
  }));
  let fullUrl = baseUrl + url;

  //拿到token和sign
  const tokenSign = await AppDefine.ocHelper.executeCmd(JSON.stringify({
    type: NativeCommand.ASK_FOR_TOKEN_AND_RSA.toString(),
  }));

  const newParams = {
    ...params,
    ...JSON.parse(tokenSign)
  };

  let responseJson: JSON;
  try {
    if (post) {
      ugLog("post, fullUrl=" + fullUrl + ", params=" + JSON.stringify(newParams));

      let response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newParams),
      });
      responseJson = await response.json();

    } else {
      for (let paramsKey in newParams) {
        if (!textEmpty(paramsKey) && !textEmpty(newParams[paramsKey])) {
          fullUrl += `&${paramsKey}=${newParams[paramsKey]}`
        }
      }
      ugLog("get, fullUrl=" + fullUrl);
      let response = await fetch(fullUrl);
      responseJson = await response.json();
      ugLog("get, responseJson=" + JSON.stringify(responseJson));

    }
  } catch (e) {
    ugError(e);
  }

  return responseJson;
}
