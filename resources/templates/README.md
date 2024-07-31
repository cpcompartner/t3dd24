# Frontend Environment

## Environment

**Node** >=18.0.0

---

## Features

- Handlebars
- Scss
- Tailwind
- Modular JavaScript (ES6/ES7)
- TypeScript
- Hbs Data handler (json)
- Global Data-Handler (psuedo-api)
- Webpack
- Development Build
- Production Build

## How to use

```
npm install
```

```bash
# Run dev-Server:
$ npm run dev
```

```bash
# Production Build:
$ npm run build
```

## Default Source-Tree

### 📁 ./src  

└ 📁 **@types**  
└ 📁 **assets**  
&nbsp;&nbsp;&nbsp;&nbsp;└ 📁 favicon  
&nbsp;&nbsp;&nbsp;&nbsp;└ 📁 Fonts  
&nbsp;&nbsp;&nbsp;&nbsp;└ 📁 icons  
&nbsp;&nbsp;&nbsp;&nbsp;└ 📁 Images  
└ 📁 **Data**  
└ 📁 **Dev-Data**  
└ 📁 **JavaScript**  
&nbsp;&nbsp;&nbsp;&nbsp;└ 📁 Controller  
&nbsp;&nbsp;&nbsp;&nbsp;└ 📁 Utilities  
└ 📁 **TypeScript**  
&nbsp;&nbsp;&nbsp;&nbsp;└ 📁 Controller  
&nbsp;&nbsp;&nbsp;&nbsp;└ 📁 Utilities  
└ 📁 **Scss**  
└ 📁 **Views**  
&nbsp;&nbsp;&nbsp;&nbsp;└ 📁 Components  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└ 📁 Layouts  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└ 📁 Defaults  
&nbsp;&nbsp;&nbsp;&nbsp;└ 📁 Pages  

## Compiling Strategy

**SCSS**  
`./src/Scss/*.scss` → `$DEST/Css/*.css`

**JavaScript**  
`./src/JavaScript/*.js` → `$DEST/JavaScript/*.js`

**TypeScript**  
`./src/TypeScript/*.js` → `$DEST/JavaScript/*.js`

**JavaScript Component-Directory**  
`./src/Views/Components/**/*.js` → *no export*

**TypeScript Component-Directory**  
`./src/Views/Components/**/*.ts` → *no export*

**JavaScript Modules Component-Directory**  
`./src/Views/Components/**/*.module.js` → `$DEST/JavaScript/*.js`

**TypeScript Modules Component-Directory**  
`./src/Views/Components/**/*.module.ts` → `$DEST/JavaScript/*.ts`

## Use JavaScript and TypeScript

```JAVASCRIPT
// use imports to split logic
import types INTERFACE from 'PathWithoutExtension';
import DefaultFunction1 from 'PathWithoutExtension-1';
import DefaultFunction2 from 'PathWithoutExtension-2';
import DefaultFunction3, { ExportedFunc } from 'PathWithoutExtension-3';

DefaultFunction1(foo, bar);
DefaultFunction2(foo, bar);
DefaultFunction3(foo, bar);
ExportedFunc();
```

```JAVASCRIPT
// Export Functions
const DefaultFunction3 = (foo, bar) => {
 //
}

const ExportedFunc = () => {
 //
}

export ExportedFunc
export default DefaultFunction3
```
