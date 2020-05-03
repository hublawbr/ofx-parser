<p align="center"><h1 align="center">@hublaw/ofx-parser</h1></p>
<h3 align="center">A light-weight Typescript Ofx Parser</h3>
<br>

<div align="center">

![npm](https://img.shields.io/npm/v/@hublaw/ofx-parser)
<space><space>
![GitHub top language](https://img.shields.io/github/languages/top/hublawbr/ofx-parser)
<space><space>
![GitHub Release Date](https://img.shields.io/github/release-date/hublawbr/ofx-parser)
<space><space>
![GitHub last commit](https://img.shields.io/github/last-commit/hublawbr/ofx-parser)
<space><space>
![GitHub](https://img.shields.io/github/license/hublawbr/ofx-parser)


</div>

A light weight Typescript tool that converts financial data from OFX into JS Object, applied only to Bank Account Statement developed and mantained by [HubLaw](https://github.com/hublawbr) and [@gusflopes](https://github.com/hublawbr), and originally written by [@bakesaled](https://github.com/bakesaled). 

---
## 🖋 Credits
This tools depends on the [`xml2js`](https://www.npmjs.com/package/xml2js) package and started by a fork from `@bakesaled/carbonate` that did an awesome work mapping all the Ofx Structure to interfaces.

---
## 🚧 Current Status
This tool is still under development and missing tests, but it works as intendend.

This package is currently being used on project under development.

---
## 📝 Instructions
There are two ways to use this use this package. You could use it as a **dependency on your project** to handle parsing OFX files. Or you can run it using the **command line tool**.


### Using this package on your project
It's pretty straightforward, you just need to install this package and use the `parseStatement()` or `parseStatementFile()` functions from the **OfxParser** module.

#### Create a Class to handle Ofx Files

Basically you need to need to install the package:

```bash
yarn add @hublawbr/ofx-parser
```

After that you can create a class to Handle Ofx files:

```ts
import OfxParser from '@hublaw/ofx-parser'

export default class OfxHandler() {
  private ofxParser = new OfxParser()
  // Call this handler using a filePath from local file system
  // You could use this together with an upload route from Controller
  public async handler(filePath: string) {
    const result: StatementModel = await ofxParser.parseStatementFile(filePath)
    
    return result
  }
}
```

You don't really need a class just for that. Specially if using the `parseStatementFile()` instead of the `parseStatement()`. 

The reason I personally prefer using it is because I do more stuff with the Ofx File, like: upload to GCloud Storage, persisting the transactions to bank, formatting specific fields like dates, download Ofx from GCloud, create signedUrl to share file, create readable stream from Gcloud instead of file system, and a few other stuff.

#### Other use cases
*Suggestions would be appreciated, but you can see the examples folder*

### Using as command line tool
You can run this project as originally designed using a command tool. For that you want to **clone the repository**, and run the following commands:

```bash
$ yarn install

$ yarn start
```
___
## License
MIT © [HubLAW](https://github.com/hublawbr)

