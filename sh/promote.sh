
#配置信息
appName=$type
appName=${appName//ios/UGiOS}
appName=${appName//android/UGBWApp}


#检查环境名
array=${sites//,/ }
for var in ${array[@]}
do
   code-push deployment history $appName "${var}_t"
done

#开始发布
for var in ${array[@]}
do
	code-push promote UGiOS "${var}_t" $var
done

echo '发布成功'
