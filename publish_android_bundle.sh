
./make_android_bundle.sh
cd ..

#发布的渠道: Staging, Arc, Pyro, Smith, Ian, a002, c001 等等
pub_type=$1

# if [ "$type" == "1" ]; then
#     pub_type="Production"
# else
#     pub_type="Staging"
# fi

pub_message="修复问题"
pub_version="1.0.1"

echo $pub_type $pub_message $pub_version

code-push release UGBWApp ./android/bundle $pub_version --deploymentName $pub_type  --description $pub_message --mandatory true
