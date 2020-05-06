import React, {Component, useState} from 'react';
import {Text} from 'react-native';
import {Input, InputProps, Icon, Button} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FUtils, { mergeProps } from '../tools/FUtils';

interface IPorps extends InputProps {
  // 父类变量
  placeholder?: string; // 占位文本
  defaultValue?: string; // 默认文本
  maxLength?: number; // 限制长度
  onChangeText?: (text: string) => void;

  // 自定义变量
  type?: '推荐人ID' | '账号' | '密码' | '确认密码' | '真实姓名' | 'QQ' | '微信' | '邮箱' | '手机号' | '字母验证码' | '短信验证码' | '空';
  styleType?: '下划线样式' | '圆角背景样式';
  hidden?: boolean; // 隐藏
  onlyInteger?: boolean; // 仅数字
  onlyNumber?: number; // 仅数字含小数
  onlyIntegerAndLetter?: boolean; // 仅数字加字母
  onlyVisibleASCII?: boolean; // 仅可见的ASCII
  additionalAllowedCharacters?: string; // 额外允许的字符
  forbiddenCharacters?: string; // 禁止的字符
  didSmsButtonClick?: (startCountdown: () => void) => void; // 发送验证码按钮被点击
}

interface IState {
  text: string; // 文本
  secureTextEntry: boolean; // 安全文本输入
}

export default class UGTextField extends Component<IPorps, IState> {
  newProps: IPorps; // 自定义props
  code: string = '';

  constructor(props: IPorps) {
    super(props);
    this.state = {text: null, secureTextEntry: !!props.secureTextEntry};
    const iconSize = 20;

    let defaultProps: IPorps = {
      styleType:'圆角背景样式',
      containerStyle: [{marginTop: 12, height: 45, backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: 22.5, overflow: 'hidden'}],
      inputStyle: {marginLeft: 8, height: 45, color: 'white', fontSize: 15},
      leftIconContainerStyle: {marginLeft: 2, width: iconSize + 10, height: iconSize},
      placeholderTextColor: 'rgba(255, 255, 255, 0.3)',
      clearButtonMode: 'while-editing',
    };
    if (props.styleType == '下划线样式') {
      defaultProps = mergeProps(defaultProps, {containerStyle:{backgroundColor:'transparent', height:50}});
    }

    const other = ((): IPorps => {
      switch (props.type) {
        case '推荐人ID':
          return {
            placeholder: '推荐人ID',
            leftIcon: {name: 'user', type: 'font-awesome', color: 'rgba(255, 255, 255, 0.6)', size: iconSize},
            keyboardType: 'number-pad',
            onlyIntegerAndLetter: true,
          };
        case '账号':
          return {
            placeholder: '请输入账号',
            leftIcon: {name: 'user', type: 'font-awesome', color: 'rgba(255, 255, 255, 0.6)', size: iconSize},
            keyboardType: 'email-address',
            onlyIntegerAndLetter: true,
          };
        case '密码':
          return {
            placeholder: '请输入密码',
            leftIcon: {name: 'lock', type: 'material', color: 'rgba(255, 255, 255, 0.6)', size: iconSize},
            rightIcon: (
              <this.Eye
                secureTextEntry={true}
                didClick={(selected) => {
                  this.newProps.secureTextEntry = selected;
                  this.setState({});
                }}
              />
            ),
            secureTextEntry: true,
            rightIconContainerStyle: {marginLeft: -6, marginRight: 3, height: iconSize},
            keyboardType: 'email-address',
            onlyVisibleASCII: true,
          };
        case '真实姓名':
          return {
            placeholder: '真实姓名',
            leftIcon: {name: 'user', type: 'font-awesome', color: 'rgba(255, 255, 255, 0.6)', size: iconSize},
          };
        case 'QQ':
          return {
            placeholder: 'QQ号',
            leftIcon: {name: 'qq', type: 'font-awesome', color: 'rgba(255, 255, 255, 0.6)', size: iconSize},
            keyboardType: 'number-pad',
            onlyInteger: true,
          };
        case '微信':
          return {
            placeholder: '微信号',
            leftIcon: {name: 'wechat', type: 'font-awesome', color: 'rgba(255, 255, 255, 0.6)', size: iconSize},
            keyboardType: 'email-address',
          };
        case '邮箱':
          return {
            placeholder: '邮箱地址',
            leftIcon: {name: 'mail', type: 'entypo', color: 'rgba(255, 255, 255, 0.6)', size: iconSize},
            keyboardType: 'email-address',
          };
        case '手机号':
          return {
            placeholder: '手机号',
            leftIcon: {name: 'device-mobile', type: 'octicon', color: 'rgba(255, 255, 255, 0.6)', size: iconSize},
            keyboardType: 'phone-pad',
            onlyInteger: true,
          };
        case '字母验证码':
          return {
            placeholder: '验证码',
            keyboardType: 'email-address',
            onlyIntegerAndLetter: true,
            leftIcon: {name: 'Safety', type: 'antdesign', color: 'rgba(255, 255, 255, 0.6)', size: iconSize},
            rightIcon: (
              <this.LetterVerificationCode
                didClick={(code) => {
                  this.code = code;
                }}
              />
            ),
          };
        case '短信验证码':
          return {
            placeholder: '验证码',
            keyboardType: 'email-address',
            onlyIntegerAndLetter: true,
            leftIcon: {name: 'Safety', type: 'antdesign', color: 'rgba(255, 255, 255, 0.6)', size: iconSize},
            rightIcon: <this.SysButton didClick={this.props.didSmsButtonClick} />,
          };
        default:
          return {};
      }
    })();
    this.newProps = mergeProps(defaultProps, other);
  }

  SysButton(props: {didClick: (startCountdown: () => void) => void}) {
    let {didClick} = props;
    let [count, setCount] = useState(59);
    let [willCountdown, setWillCountdown] = useState(0);

    let title: string = '发送验证码';
    let disabled = false;
    if (willCountdown) {
      title = `${count}秒后重新获取`;
      disabled = true;
      setTimeout(() => {
        if (count == 1) {
          setCount(59);
          setWillCountdown(0);
        } else {
          setCount(count - 1);
        }
      }, 1000);
    }

    return (
      <Button
        title={title}
        disabled={disabled}
        disabledStyle={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}
        disabledTitleStyle={{color: '#CCC'}}
        buttonStyle={{marginRight: 3, backgroundColor: 'rgba(255, 255, 255, 0.25)'}}
        titleStyle={{fontSize: 11}}
        onPress={() => {
          didClick &&
            didClick(() => {
              setWillCountdown(1);
            });
        }}
      />
    );
  }

  // 安全输入的眼睛图标
  Eye(props: {secureTextEntry: boolean; didClick: (selected: boolean) => void}) {
    var {secureTextEntry, didClick} = props;
    var [selected, setSelected] = useState(secureTextEntry);
    var name = selected ? 'md-eye-off' : 'md-eye';
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected((selected = !selected));
          didClick(selected);
        }}>
        <Icon name={name} type="ionicon" size={22} color="rgba(255, 255, 255, 0.3)" containerStyle={{marginLeft: 15, marginRight: 4}} />
      </TouchableOpacity>
    );
  }

  // 验证码
  LetterVerificationCode(props: {didClick: (code: string) => void}) {
    var [count, setCount] = useState(0);

    var code = '';
    var codeLength = 4; //验证码的长度，可变
    var selectChar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (var i = 0; i < codeLength; i++) {
      var charIndex = Math.floor(Math.random() * selectChar.length);
      code += selectChar[charIndex];
    }
    return (
      <Text
        style={{
          color: 'white',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          paddingVertical: 6.5,
          paddingLeft: 12,
          paddingRight: 8,
          borderRadius: 8,
          overflow: 'hidden',
          fontWeight: '600',
          fontStyle: 'italic',
          letterSpacing: 3,
          marginRight: 3,
        }}
        onPress={() => {
          setCount(count + 1);
          props.didClick(code);
        }}>
        {code}
      </Text>
    );
  }

  // 刷新UI
  render() {
    var props = mergeProps(this.newProps, this.props);
    if (this.props.hidden) {
      mergeProps(props, {containerStyle: {marginTop: 0, height: 0}});
    }
    return (
      <Input
        {...props}
        value={this.state.text ?? null}
        onChangeText={(text) => {
          var {
            onlyInteger: onlyNumbers,
            onlyNumber: onlyNumbersWithDecimals,
            onlyIntegerAndLetter: onlyNumbersAndLetters,
            onlyVisibleASCII,
            additionalAllowedCharacters: chars = '',
            forbiddenCharacters,
          } = this.newProps;

          // 禁用指定字符
          if (forbiddenCharacters) {
            text = text.replace(new RegExp(`[${forbiddenCharacters}]+`), '');
          }
          var reg: string = null;
          // 仅数字
          if (onlyNumbers) {
            reg = `[0-9${chars}]*`;
          }
          // 仅数字含小数
          else if (onlyNumbersWithDecimals) {
            text = text.match(new RegExp(`[0-9.${chars}]*`, 'g'))?.join('') ?? '';
            reg = `^[0-9]*[.]?[0-9${chars}]{0,${onlyNumbersWithDecimals}}`;
          }
          // 仅数字加字母
          else if (onlyNumbersAndLetters) {
            reg = `[0-9A-Za-z${chars}]*`;
          }
          // 仅可见的ASCII码
          else if (onlyVisibleASCII) {
            reg = `[\x20-\x7E${chars}]*`;
          }
          if (reg) {
            text = text.match(new RegExp(reg, 'g'))?.join('') ?? '';
          }
          this.setState({text: text});

          // 回调
          this.props.onChangeText && this.props.onChangeText(text);
        }}
      />
    );
  }
}
