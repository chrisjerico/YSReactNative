import AppDefine from "../../../js/rn/公共类/AppDefine";
import {NativeCommand} from "../site/NativeCommand";
import {ugError, ugLog} from "../utils/UgLog";

export default async function ServerHttp(params: object, url: string, post = true) {

  //得到host
  const baseUrl = await AppDefine.ocHelper.performSelectors(JSON.stringify({
    type: NativeCommand.APP_HOST,
  }));
  let fullUrl = baseUrl + url;

  //拿到token和sign
  const tokenSign = await AppDefine.ocHelper.performSelectors(JSON.stringify({
    type: NativeCommand.ASK_FOR_TOKEN_AND_RSA,
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
        fullUrl += `&${paramsKey}=${params[paramsKey]}`
      }
      ugLog("get, fullUrl=" + fullUrl);
      let response = await fetch(fullUrl);
      responseJson = await response.json();

    }
  } catch (e) {
    ugError(e);
  }

  return responseJson;
}
