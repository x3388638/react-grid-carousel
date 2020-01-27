import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default [
  {
    input: 'src/app.js',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ],
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    external: [
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.peerDependencies)
    ]
  }
]
