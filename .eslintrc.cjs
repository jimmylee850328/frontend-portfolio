module.exports = {
    root: true,
    extends: ["plugin:vue/vue3-recommended"],
    parserOptions: {
        ecmaVersion: "latest" 
    },
    rules: {
        "indent": [
            "error",
            4
        ],
        semi: ['error', 'always'],
        'vue/script-indent': [
            'error',
            4,
            {
                'baseIndent': 1 
            }
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                'baseIndent': 1 
            }
        ],
        "dot-notation": "error",
        "vue/dot-notation": "error",
        "array-bracket-newline": [
            "error",
            {
                "multiline": true 
            }
        ],
        "no-multiple-empty-lines": [
            1, {
                "max": 2 
            }
        ],
        "brace-style": [
            2, "1tbs", {
                "allowSingleLine": true 
            }
        ],
        "no-multi-spaces": "error",
        "no-multi-str": "error",
        'comma-spacing': [
            'error', {
                'after': true 
            }
        ],
        "key-spacing": [
            "error", {
                "beforeColon": false,
                "afterColon": true,
            }
        ],
        "object-curly-spacing": ["error", "always"],
        'object-property-newline': [
            'error', {
                allowAllPropertiesOnSameLine: true 
            }
        ],
        "vue/prop-name-casing": [
            "error",
            "snake_case"
        ],
        "vue/component-name-in-template-casing": [
            "error", 
            "kebab-case", {
                "registeredComponentsOnly": false,
                "ignores": [] 
            }
        ]
    },
    "overrides": [
        {
            "files": ["*.vue", "*.js"],
            "rules": {
                "indent": "off" 
            } 
        }
    ] 
};

