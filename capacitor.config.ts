import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zoomobile.app',
  appName: 'zooMobile',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
		url: 'https://monzoomobile.onrender.com',
		cleartext: true
	}
};

export default config;
