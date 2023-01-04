import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zoomobile.app',
  appName: 'ZooMobile',
  webDir: 'out',
  bundledWebRuntime: false,
  "server": {
    "url": "http://192.168.95.215:8080",
    cleartext: true
  }
};

export default config;
