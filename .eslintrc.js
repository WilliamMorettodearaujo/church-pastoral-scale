module.exports = {
    ignorePatterns: ['src/migrations/**'],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'prettier/prettier': ['off'],
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'quotes': ['error', 'double'],
        'semi': ['error', 'always'],

        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/typedef': [
            'error',
            {
                'arrayDestructuring': false,
                'arrowParameter': false,
                'memberVariableDeclaration': false,
                'objectDestructuring': false,
                'parameter': false,
                'propertyDeclaration': true,
                'variableDeclaration': false
            }
        ],
        'max-len': ['error', { 'code': 100 }],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                'selector': 'class',
                'format': ['PascalCase']
            }
        ],
    },
};
