const config = {
  '**/*.ts?(x)': [
    'eslint --fix',
    'prettier --write',
    () => 'tsc --noEmit --pretty',
  ],

  '*': 'prettier --write --ignore-unknown',
};

export default config;
