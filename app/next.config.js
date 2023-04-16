// const withMarkdoc = require('@markdoc/next.js');

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx']
// }

// module.exports = withMarkdoc({
// 	schemaPath: './src/markdoc'
// })(nextConfig)

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
	
}
  
module.exports = nextConfig

