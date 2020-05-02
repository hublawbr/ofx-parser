# @hublaw/ofx-parser

A tool that converts financial data from OFX into JSON, applied only to Bank Account Statement developed and mantained by HubLaw and @gusflopes

## Credits
This tools depends on the `xml2js` package and started by a fork from `@bakesaled/carbonate` that did an awesome work mapping all the Ofx Structure to interfaces.
    "date-fns": "^2.9.0",
    "prompts": "^2.3.1",
    "xml2js": "^0.4.23"

## Current Status
This tool is still under development and missing tests, but it works as intendend.

Next weeks we plan to work on the project structure, test the integration when used as a package, and write some more tests for it.

## Using as a Project instead of a Package

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# 

```

### Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Usage
(see example code)
