cd ..
cport=$1
if [ "$cport" == "" ]; then
   adb reverse tcp:8081 tcp:8081
else
   adb reverse tcp:${cport} tcp:${cport}
fi