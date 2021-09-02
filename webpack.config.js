import { resolve as _resolve } from 'path'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export const entry = './src/index.tsx'
export const devtool = 'inline-source-map'
export const output = {
  path: _resolve(__dirname, 'dist'),
  filename: 'bundle.js',
  chunkFilename: '[id].js',
  publicPath: '',
}
export const resolve = {
  // We need to add .tsx and .ts as file extensions to be resolved
  extensions: ['.js', '.jsx', '.tsx', '.ts'],
}
export const module = {
  rules: [
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        plugins: ['lodash'],
      },
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [['autoprefixer', {}]],
            },
          },
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif)$/,
      loader: 'url-loader?limit=10000&name=img/[name].[ext]',
    },
    //  We have to add ts-loader to load our typescript files
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
}
export const plugins = [
  new HtmlWebpackPlugin({
    template: `${__dirname}/src/index.html`,
    filename: 'index.html',
    inject: 'body',
  }),
  new LodashModuleReplacementPlugin(),
]
