import {
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { scale } from '../../tools/Scale'
import { UGColor } from '../UGThemeColor'
import { st } from './UGSkinConf'

// 样式
export interface UGSkinStyle<Style> {
  examplePage: {
    header: Style
  }
}

export const skinStyles: UGSkinStyle<st<ViewStyle | TextStyle | ImageStyle>> = {
  examplePage: {
    header: {
      默认: { flex: 1, flexDirection: 'row', fontSize: 20, fontWeight: '100', marginBottom: 20, justifyContent: 'center' }
    }
  }
}
