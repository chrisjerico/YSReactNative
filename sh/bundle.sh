#拉依赖包
yarn install

#配置信息
ver=$type
ver=${ver//ios/1.2}
ver=${ver//android/1.0.1}

appName=$type
appName=${appName//ios/UGiOS}
appName=${appName//android/UGBWApp}

log=`git log --oneline -1`

#检查环境名
array=${sites//,/ }
for var in ${array[@]}
do
   code-push deployment history $appName "${var}_t"
done

#开始打包
for var in ${array[@]}
do
   code-push release-react $appName $type --t $ver --dev false --d "${var}_t" --des "$log" --m true
done

echo '打包成功'