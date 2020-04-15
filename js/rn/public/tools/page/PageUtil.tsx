
/**
 * 设置标题
 *
 * @param props 默认属性
 * @param title 标题
 */
export const combineIntentProps = (props: object, title: string) => {
  return {
    ...props,
    intent: {//默认标题
      sTitleText: title
    }
  };
};
