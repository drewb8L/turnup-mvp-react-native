module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        'react-native-material-datetime-picker': './empty-module.js',
                        'RNCMaterialDatePicker': './empty-module.js', // optional alias for native symbol
                    },
                },
            ],
        ],
    };
};