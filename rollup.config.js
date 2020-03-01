import typescript from 'rollup-plugin-typescript'
import commonjs from 'rollup-plugin-commonjs'

const pkg = require('./package.json')
const name = pkg.name.split('/').pop()
const version = pkg.version

var banner =
`/*!
 * ${pkg.name} ${version} (https://github.com/tomieric/canvas-timeliner)
 * API https://github.com/tomieric/canvas-timeliner/blob/master/README.md
 * Copyright 2020-preset tommyshao All Rights Reserved
 * Licensed under MIT (https://gitlab.com/tomieric/canvas-timeliner/blob/master/LICENSE)
 */
`

const config = ['cjs', 'es'].map(format => ({
  name,
  input: './src/index.ts',
  output: {
    file: `dist/${format === 'es' ? 'esm' : 'lib'}/index.js`,
    format,
    banner
  },
  plugins: [
    typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
    commonjs({extensions: ['.js', '.ts']})
  ]
}))

export default config
