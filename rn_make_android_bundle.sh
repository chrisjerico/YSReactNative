rm -rf ./android/bundle ./android/app/src/main/assets/index.android.bundle
mkdir ./android/bundle
react-native bundle --platform android --entry-file index.js --bundle-output ./android/bundle/index.android.bundle --assets-dest ./android/bundle/ --dev false
cp ./android/bundle/index.android.bundle ./android/app/src/main/assets/index.android.bundle