module.exports = {
  webpack: {
        configure: {
            module: {
                rules: [
                    {
                        type: 'javascript/auto',
                        test: /\.mjs$/,
                        include: /node_modules/,
                    },
                ],
            },
        },
    },
  images: {
    domains: ["{portfolio-url}.netlify.app"],
  },
};