---
title: nightwatch实现vue应用e2e测试
date: 2020-05-29 11:49:12
tags:
- nightwatch
- e2e
categories:
- 测试
---
### nightwatch实现vue应用e2e测试
nightwatch是一个基于Selenium WebDriver API的e2e自动化测试框架，可以使用js方法与css选择器来编写运行在Selenium服务器上的端到端测试。这里直接使用vue-cli来安装的，nightwatch的相关模块都已自动安装，下面就来解释下安装了哪些模块，以及具体怎么进行测试。
<!--more-->
#### 1.nightwatch安装
由于nightwatch需要Selenium才能工作，所以这两样东西我们要一起安装(vue-cli安装时会提示，如果选y会自动安装)
```
// install selenium-server
npm install selenium-server
// install nightwatch
npm install nightwatch
```
##### tips：由于selenium是java服务，要想启动必须安装jdk，且版本必须大于等于1.8！

#### 2.目录(vue-cli会自动生成该文件夹)
```
├── e2e
│   ├── custom-assertions
│   │   └── elementCount.js 自定义的断言方法
│   ├── nightwatch.conf.js nightwatch的配置文件
│   ├── reports 
│   │   ├── CHROME_61.0.3163.100_Windows NT_edit.xml
│   │   └── CHROME_61.0.3163.100_Windows NT_test.xml
│   ├── runner.js  用来起服务
│   └── specs
│       └── test.js 测试用例
```
#### 3.nightwatch.conf.js
```
require('babel-register')
var config = require('../../config')

module.exports = {
  src_folders: ['test/e2e/specs'], // 测试用例存放目录
  output_folder: 'test/e2e/reports', // 测试报告存放目录
  custom_assertions_path: ['test/e2e/custom-assertions'], // 自定义断言方法存放地址  

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path, // selenium服务的地址 
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path // webDriver的地址，可以添加多个，这里只用了chrome的
    }
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
```
#### 4.runner.js 启动服务的js
```
process.env.NODE_ENV = 'testing'
var server = require('../../build/dev-server.js') 

server.ready.then(() => {
  // 1. start the dev server using production config
  // 2. run the nightwatch test suite against it
  // to run in additional browsers:
  //    1. add an entry in test/e2e/nightwatch.conf.json under "test_settings"
  //    2. add it to the --env flag below
  // or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
  // For more information on Nightwatch's config file, see
  // http://nightwatchjs.org/guide#settings-file
  var opts = process.argv.slice(2)
  if (opts.indexOf('--config') === -1) {
    opts = opts.concat(['--config', 'test/e2e/nightwatch.conf.js'])
  }
  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome'])
  }

  var spawn = require('cross-spawn')
  var runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' })

  runner.on('exit', function (code) {
    server.close()
    process.exit(code)
  })

  runner.on('error', function (err) {
    server.close()
    throw err
  })
})
```
#### 5.测试用例
```
module.exports = {
  'default e2e tests': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      // 查看有否搜索框，并且赋值
      .assert.elementPresent('input')
      .setValue('input', 'j')
      // 查看有否搜索按钮，并且点击
      .assert.elementPresent('.contact-list-wrap:nth-child(1) button')
      .pause(1000)
      .click('.contact-list-wrap:nth-child(1) button')
      .pause(1000)
      // 查看搜索后的第一项
      .assert.elementPresent('.el-table')
      .click('.el-table .el-table__row:nth-child(1)')
      .pause(3000)
      // 3秒后关闭弹窗
      .click('.el-dialog__close')
      .pause(3000)
      // 3秒后点击删除
      .click('.el-table .el-table__row:nth-child(1) .el-button--default')
      .pause(1000)
      // 1秒后取消删除
      .click('.el-message-box__btns .el-button--default')
      .pause(3000)
      // 3秒后点击删除
      .click('.el-table .el-table__row:nth-child(1) .el-button--default')
      .pause(1000)
      // 1秒后确认删除
      .click('.el-message-box__btns .el-button--primary')
      .pause(5000)
      .end()
  }
}
```
调用命令 node test/e2e/runner.js即可启动服务，等几秒后，会自动打开chrome进行测试。

![test001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/test001.jpg)

#### 6.测试报告转HTML
可以安装插件nightwatch-html-reporter将测试报告转为html文件

#### 7.使用一个浏览器对象完成测试

![test003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/test003.jpg)

![test002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/test002.jpg)

#### 8.配置浏览器语言 是否为无头浏览器、错误截屏等

![test004](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/test004.jpg)