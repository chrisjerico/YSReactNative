
./make_android_bundle.sh
cd ..

#发布的渠道: Staging, Arc, Pyro, Smith, Ian, a002, c001 等等
#发布所有渠道，输入: all
pub_type=$1

if [ "$pub_type" == "all" ]; then
	all_sites=cmd/all_sites.txt
	string=$(cat ${all_sites})  
	array=(${string//,/ })  
	 
	for var in ${array[@]}
	do
	   cmd/push_x_bundle.sh $var
	done
else
	array=(${pub_type//,/ })
	 
	for var in ${array[@]}
	do
	   cmd/push_x_bundle.sh $var
	done
fi
