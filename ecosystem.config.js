module.exports = {
  apps: [
    {
      name: 'gamein-backend',
      script: 'dist/main.js',
      instances: 1, // or 'max' to use all CPUs
      exec_mode: 'fork', // or 'cluster' for load balancing
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
