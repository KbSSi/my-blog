---
title: "利用AI快速开发Google插件"
date: "2025-08-31T00:15:00.000Z"
excerpt: "利用AI相关工具，快速上手Google插件开发"
tags: ["插件开发", "Trae", "Dify"]
author: "Kang"
---


## 背景

上手AI应用，最有正反馈的方法，就是做一个能够在工作中用得上的应用来练手。

如果涉及到多时区的业务，应该很多人都会有接触到**时间撮**的数据类型，时间撮转换成正常的时间格式，是工作中比较场景的一个场景，大部分人还是会打开网页来进行在线转换，这个动作其实可以用插件来更方便的完成。

目前Google商店中搜索比较多的是[Unix Timestamp Converter](https://chromewebstore.google.com/detail/时间戳转换工具)这款插件，但体验了下还是觉得比较一般，例如在展示上会重合，没有正常日期转时间撮的反向功能等。



本次开发将时间转换和语言翻译整合到一个插件中，插件已提交谷歌应用上线, 目前正在审核阶段。



下面会还原插件开发的整个流程，新手小白根据这个教程，也可以做出一款自己的应用。

## 工具准备

AI Coding工具：trae

Dify

DeepSeek大模型API



## 步骤

### **AI编码**

**1、创建Chrome插件脚手架**

因为AI的输出是有幻觉的，但是如果我们能让AI在一定框架的范围内来生成和更改代码，则生成的结果会更加可靠

```Plain
npm create chrome-ext@latest time-transfer -- --template vue-ts
```



**2、打开trae编辑器，进行代码编写**

设置项目编码规则，让trae在规则下编码：

![img](https://ifqeccka29.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDkyMDA4NzcyMjlkNGQxNDc4MWEzM2JmMGU0MzE5ZmFfYk1GQlhrcklyN1RIZEtvZU04dzhoZ1BmSXRVTUk1YWlfVG9rZW46WGx1U2JFdVNlb0F0U2R4eGFHTWNhd2ZtbktkXzE3NTY2MjYyNDQ6MTc1NjYyOTg0NF9WNA)

~~~Markdown
# TypeScript 项目 AI 助手编码规则

## 🎯 核心原则
1.  **现代 TypeScript 优先**：使用最现代、最简洁的 TypeScript 语法（ES2022+）。
2.  **类型安全第一**：严禁使用 `any`。所有变量、函数参数和返回值都必须有明确的类型。优先使用泛型、`unknown` 和类型守卫。
3.  **严格模式**：假设 `strict: true` 已在 `tsconfig.json` 中启用。
4.  **自解释代码**：生成的代码应清晰、可读，优先选择有意义的变量名而非注释。只在处理复杂逻辑时添加简洁的 JSDoc/注释。

## 📜 具体规则

### 1. 类型定义
- **禁止使用 `any`**：如果类型暂时不确定，使用 `unknown` 并配合类型收窄。
- **接口 vs 类型**：
  - 优先使用 `interface` 定义对象和类。
  - 使用 `type` 定义联合类型、交叉类型、元组或复杂的类型操作。
- **只读结构**：对于不应被修改的对象和数组，使用 `readonly` 和 `ReadonlyArray<T>`/`readonly T[]`。
- **精确的类型**：避免过度使用宽泛的类型如 `string`。使用字面量联合类型（如 `type Status = 'idle' | 'loading' | 'success' | 'error'`）。

### 2. 函数与范式
- **箭头函数**：优先使用箭头函数（`=>`）而非 `function` 关键字，以保持 `this` 的上下文一致性。
- **异步处理**：统一使用 `async/await`，避免直接使用 `.then()` 链式调用。
- **错误处理**：使用 `try/catch` 处理同步和异步错误。抛出的错误必须是 `Error` 的实例或其子类。
- **函数式风格**：优先使用 `map`, `filter`, `reduce`, `find` 等数组方法，而非 `for` 循环。

### 3. 组件与 React (如果适用)
- **函数式组件**：只编写函数式组件和 Hooks，不编写类组件。
- **状态管理**：优先使用 `useState`, `useReducer`。对于复杂状态，考虑使用 `immer` 进行不可变更新。
- **副作用**：所有副作用都必须封装在 `useEffect` 中，并正确指定依赖数组。
- **Props 类型**：使用 `interface` 或 `type` 明确定义组件 Props。

### 4. 代码风格与格式
- **命名**：
  - 变量/函数：`camelCase`
  - 类型/接口：`PascalCase`
  - 常量：`UPPER_SNAKE_CASE`（如果值是真正不可变的）
- **分号**：**不使用分号**（除非必要）。
- **引号**：使用**单引号（`'`）**。
- **箭头函数括号**：单参数时省略括号，多参数时保留括号。例如：`(x) => x*2` 和 `(x, y) => x + y`。
- **导出**：优先使用命名导出（`export const func = ...`）而非默认导出。

### 5. 项目特定约定
- **路径别名**：假设 `tsconfig.json` 中设置了 `@/*` 作为 `./src/*` 的别名。导入时请使用 `@/components/Button` 而非相对路径 `../../components/Button`。
- **工具函数**：常用的工具函数（如 `formatDate`, `debounce`）应放在 `@/lib/utils.ts` 中。
- **HTTP 客户端**：假设我们使用 `axios`，实例已配置在 `@/lib/axios.ts` 中。请使用它进行网络请求。

## ❌ 负面示例 (不要这样做)
```typescript
// 错误1：使用 any
function getData(): any { ... }

// 错误2：松散的类型
const status: string = 'idle'; // 应为 'idle' | 'loading'...

// 错误3：旧的异步模式
fetchData().then((data) => { setData(data); });

// 错误4：修改只读数据
const config = { url: '/api' };
Object.assign(config, { newProp: 'value' }); // 可能引发错误
~~~

返回对话，选择Builder，点击Qwen3-Coder模型（专业版有Claude-sonnet模型，效果会更好），在chat模式下，输入提示词：

```Plain
更改插件功能：
1、滑词后，点击鼠标右键，弹出可以选择的功能框，选择项有两种，第一是时间撮转换功能，第二是翻译功能。注意选择框尺寸不要太大，为长条形的
2、点击某个功能，则调用该功能，在页面上展示转换后的结果，结果用红色字体标注
3、时间撮转换功能，利用ts逻辑来实现，翻译功能，需要调外部api，需要保留restApi接口
```

![img](https://ifqeccka29.feishu.cn/space/api/box/stream/download/asynccode/?code=YjM3NzIyYTVkZjE3NWU5NjMwZTZlNmMyM2U0NDU1NmNfRUd1MkZNYkN1d3k5aGtiVk1scElGbThNSlVna3N4MjNfVG9rZW46V0Z2VmJiazBNb1dHMnZ4Y1dGVGM1Q09hbjNlXzE3NTY2MjYyNDQ6MTc1NjYyOTg0NF9WNA)

**3、执行生成后，先在Google浏览器部署一版**

执行命令npm run build:extension，会在项目的根目录下创建好一个extend-build目录，在Google插件的拓展程序中，把该目录加载进来即可。

![img](https://ifqeccka29.feishu.cn/space/api/box/stream/download/asynccode/?code=MzY4ODlkNTQ3ZWU4ZGJjODUwYjM4M2VlMzEyMWRjMTVfcnA4eGFtblpIdzlaR2tvYjk0TUUyUEV1cDB4WHBuQVNfVG9rZW46UzhxaGJqckJLbzlXd3V4Q2Rwd2NtTEdKbmhSXzE3NTY2MjYyNDQ6MTc1NjYyOTg0NF9WNA)



**4、根据目前AI生成的效果，测试下，如果觉得那里不好或者有问题，可以让AI再调整**

注意：因为AI调整可能会覆盖之前的代码，如果有一版自己觉得不错的代码，记得先保存或者commit到本地仓库中，以免后续被覆盖。



大概调整个10轮左右，一个插件就能出来了！

![img](https://ifqeccka29.feishu.cn/space/api/box/stream/download/asynccode/?code=YjRlMjE3MjU5NWIyODFhY2Y1MDFkMDk0ODQ1YjJkN2NfSEcydnA5QW8yZ3FWOEhaZENoZVN6SWVEYThlRGhjZkxfVG9rZW46UE8zM2JPejZVb3l6dUJ4SXJCR2N4NFZUbmllXzE3NTY2MjYyNDQ6MTc1NjYyOTg0NF9WNA)





### **Dify翻译工作流搭建**

为了用上Dify的工作流来做翻译的功能，还搭建了一个简单的翻译工作流。

Dify可以方便我们对大模型的输入输出做处理。

**1、创建工作流**

创建空白应用这里选择工作流即可，输入名称和描述

![img](https://ifqeccka29.feishu.cn/space/api/box/stream/download/asynccode/?code=YjlmZmJlNDk5MjUzYWNlNjIyZmQyMDFkMTc2YTZmZDBfNnVPU0hQeEhQamFhY1Fza1JmQlU4UEdYczJlM3Vqa3VfVG9rZW46UTF4TmJJZ2FCb293bGZ4V3VvU2NXQkxnbmZiXzE3NTY2MjYyNDQ6MTc1NjYyOTg0NF9WNA)

**2、构建工作流输入和输出**

![img](https://ifqeccka29.feishu.cn/space/api/box/stream/download/asynccode/?code=NDNmNWU1NDMwZGM0ZWRjZDhhYmFlZWNjN2U3YWI5YTJfQ3liWjQ4UUpaNnFvQzRuWFFNdEZrRTUzaWF1RmRxUTZfVG9rZW46SkwzVWJCaXNjb3lQR0x4YXdXdGN6dFdabng4XzE3NTY2MjYyNDQ6MTc1NjYyOTg0NF9WNA)



**3、编写Prompt**

翻译的工作流较为简单，把翻译的Prompt写清楚就可以

![img](https://ifqeccka29.feishu.cn/space/api/box/stream/download/asynccode/?code=NWUxM2U1MWIwYjQ0MWExZGVhYmIxMmY4NTkwYWVjNTVfajVBOWpjNHlEeWQ4OW5iSTVTdlNzd0ZnS3hjbEJiM0ZfVG9rZW46R1hDbmJtNTlhb1R5a0d4VVc4UWM4cmZ0blpjXzE3NTY2MjYyNDQ6MTc1NjYyOTg0NF9WNA)



**4、调整代码**

一开始在Trae中输入给大模型的提示词，预留了RestFul Api，因此创建完Dify的工作流后，只需要拿到Dify提供的API，进行替换即可，中间会涉及到对该API的输入和输出的一些处理，也可以交给大模型来直接处理，Dify Api的使用参考[官方文档](https://cloud.dify.ai/app/6f1e3c97-1d16-4158-b201-3c06a0ec6c9c/develop)。



 调整完后，再部署下，一个能够帮助你翻译的插件就诞生了！

![img](https://ifqeccka29.feishu.cn/space/api/box/stream/download/asynccode/?code=MzBiNDNkNGViZGI1ODIwNzhmYWQ2YjI3MmI4M2JlOWZfSFVtWWVZUFRwS3Q3WkVKUTBpVGZKODlYamFBOXc1Y3pfVG9rZW46WFo5RmJkZUdhb3FzOFN4VUFNWGNwSzdnbnllXzE3NTY2MjYyNDQ6MTc1NjYyOTg0NF9WNA)



### **发布**

如果是为了自己使用的，可以直接在Google的拓展程序处加载未打包的拓展程序就可以

如果想把自己的应用程序发布到谷歌的应用商店，可以参考[官方文档](https://developer.chrome.com/docs/webstore/publish?hl=zh-cn)，具体的先不在这里赘述了。





## **结论**

因为AI的出现，每个人都是开发者，有自己想动手实现的Idea，AI会帮助你快速实现，做一个简版的MPV还是一件比较容易的事情。



期待后续自己能够分享更多好用的工具和AI应用。