import APIRouter from "../../../public/network/APIRouter";
import {ugLog} from "../../../public/tools/UgLog";

interface UseVersion {
  testResult?: (str: string) => void //测试网速结果
}

/**
 * 版本页 辅助类
 * @param testResult
 * @constructor
 */
const UseVersion = ({
                      testResult
                    }: UseVersion) => {

  //测试网络情况
  const testNetwork = () => {
    let lastTime = new Date().getTime()
    APIRouter.system_onlineCount()
      .then(res => {
        let curTime = new Date().getTime()
        let div = curTime - lastTime;
        ugLog('try div=', div);

        const status = res?.status + "," + res?.data?.code;
        if (div < 500) {
          testResult && testResult('网络很好,' + status)
        } else if (div < 1000) {
          testResult && testResult('网络一般,' + status)
        } else if (div < 1500) {
          testResult && testResult('网络很差,' + status)
        } else {
          testResult && testResult('网络极差,' + status)
        }
        ugLog('try res=', res?.data);
      })
      .catch(err => {
        ugLog('try err=', err)
        testResult && testResult('网络异常:' + JSON.stringify(err))
      })
  }

  return {
    testNetwork
  }
}

export default UseVersion
