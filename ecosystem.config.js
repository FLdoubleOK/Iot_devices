module.exports = {
  apps: [{
    name: 'IotDevicesControl',
    script: 'C:\\Websites\\IoTDevicesControl\\server.js',
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: 'development',
      PORT: 3000, // Default port for development
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5017, // Default port for development
    },
    dot_env_file: '.env',
  }]
};
