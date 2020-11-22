cd ..

#回滚的渠道: Staging, Arc, Pyro, Smith, Ian, a002, c001 等等
#回滚所有渠道，输入: all

pub_type=$1

if [ "$type" == "all" ]; then
	all_sites=cmd/all_sites.txt
	string=$(cat ${all_sites})  
	array=(${string//,/ })  
	 
	for var in ${array[@]}
	do
	   code-push rollback UGBWApp $var
	done
else
	array=(${pub_type//,/ })
	 
	for var in ${array[@]}
	do
	   code-push rollback UGBWApp $var
	done
fi