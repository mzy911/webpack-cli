const staticConfig = require("./static");
const styleConfig = require("./style");


module.exports = {
  rules: [
    {
      // 直接找到对应的loader，不用一个个对比
      oneOf: [
        // 处理样式：css、less、sass
        ...styleConfig.style,


        // 处理静态资源
        ...staticConfig.rules,
      ]
    }
  ]
}