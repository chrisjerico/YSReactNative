import AsyncStorage from '@react-native-community/async-storage'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
const middleware = (tron) => {
  /* plugin definition */
}

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: 'React Native Demo',
  })
  .use(reactotronRedux())
  .useReactNative() // add all built-in react native plugins
  // .use(middleware) // plus some custom made plugin.
  .connect()
export default reactotron
