module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic', // Enable automatic JSX transform
      },
    ],
    '@babel/preset-typescript',
  ],
};
