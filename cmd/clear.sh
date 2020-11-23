cd ..

#清除的渠道: Staging, Arc, Pyro, Smith, Ian, a002, c001 等等
#清除所有渠道，输入: all

pub_type=$1

if [ "$type" == "all" ]; then
	all_sites=cmd/all_sites.txt
	string=$(cat ${all_sites})  
	array=(${string//,/ })  
	 
	for var in ${array[@]}
	do
	   code-push deployment clear UGBWApp $var
	done
else
	array=(${pub_type//,/ })
	 
	for var in ${array[@]}
	do
	   code-push deployment clear UGBWApp $var
	done
fi