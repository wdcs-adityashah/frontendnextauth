module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // Enable JSX
        },
    },
    env: {
        browser: true, // Enable browser globals
        node: true,    // Enable Node.js globals
        es2021: true,  // Enable ES2021 globals
    },
    globals: {
        fetch: "readonly", // Define fetch as a global variable
        React: "readonly",

        // Add other globals if necessary
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended', // Add this line
    ],
    plugins: ['@typescript-eslint', 'react'],
    rules: {
       'no-explicit-any': 'error',
    'no-unused-vars': 'warn',
    },
};
