import { ImageSource } from "react-native-vector-icons/Icon";
import ImageEditor from "@react-native-community/image-editor";
import { useState, useEffect } from "react";
interface ISize {
  width: number,
  height: number
}
interface IOffset {
  width: number,
  height: number
}
const useSpriteImage = ({ source, rowNum = 0, columnNum = 0, size, offset }: { source: ImageSource, rowNum: number, columnNum: number, size: ISize, offset: IOffset }) => {
  const [imageArray, setImageArray] = useState<string[]>([])
  useEffect(() => {
    if (source && rowNum && columnNum) {
      cutUpImage()
    }
  }, [])
  const cutUpImage = async () => {
    let tempArray = []
    let imagePromise = []

    for (let i = 0; i < rowNum; i++) {
      for (let j = 0; j < columnNum; j++) {
        imagePromise.push(ImageEditor.cropImage(source, {
          offset: { x: i * offset.width, y: j * offset.height },
          size: { width: size.width, height: size.height },
          displaySize: size,
          resizeMode: 'contain'
        }).then((res) => {
          tempArray.splice(i + j, 0, res)
        }))
      }
    }
    Promise.all(imagePromise)
      .then((res) => {
        setImageArray(tempArray)
      })
  }
  return { imageArray }
}
export default useSpriteImage