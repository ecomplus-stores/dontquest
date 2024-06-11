const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './base-config/sections': path.resolve(__dirname, 'template/js/custom-js/cms/sections.js')
    }
  }
})
