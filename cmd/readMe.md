# UG包网App（机密）

------

***Author: Arc***

![avatar](https://i.ibb.co/yP14TXs/ic-launcher.png)

> Copyright © 本文档及相关代码为公司机密，未经许可不得对外拷贝、发布、转借等。

------

## <1> 命令说明

------

命令为 React 相关命令，脚本只为简化使用 ，功能分别是：

> * 删除node_modules：del_nodes.sh
> * 重新安装相关依赖：install_android.sh
> * 生成 js bundle 文件：make_android_bundle.sh
> * 重置端口：reverse_adb.sh
> * 启动React窗口：start.sh

------

命令为 code-push 相关命令，脚本只为简化使用 ，功能分别是：

> * 列举所有渠道的情况：list_all_deployment.sh
> * 清除某个渠道的热更新包：clear.sh XXX
> * 发布某个渠道的热更新：publish_android_bundle.sh XXX
> * 回滚某个渠道的包（发布出去的包有问题，需要回撤使用）：rollback.sh XXX

------

**XXX** 为渠道，比如 **clear.sh a002,c001** 为清除 a002和c001 的所有热更新，如果想操作所有渠道，就是 **all**，比如 **clear.sh all** 为清除所有渠道热更新。

------



## <2> 注意事项

> * 操作前想3秒，渠道有没有推错
