
./rn_make_android_bundle.sh

#发布的渠道: 正式 Production，测试 Staging
pub_type=$1

# if [ "$type" == "1" ]; then
#     pub_type="Production"
# else
#     pub_type="Staging"
# fi

pub_message="修复问题"
pub_version="1.0.0"

echo $pub_type $pub_message $pub_version

code-push release UGBWApp ./android/bundle $pub_version --deploymentName $pub_type  --description $pub_message --mandatory true
