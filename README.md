# webpack-timeout-test

A demo just for [the issue](https://github.com/webpack/webpack/issues/14874)

Install npm-pacakges at first:

```bash
npm i
```

We have server.js — just a simple express server, which serve index.html and built js-files
server.js has a logic to respond with 404 code, if a request has `dynamic` in its path.

dist dir — an output of webpack build

To start a server just run:

```bash
npm start
```

So, where is the problem?

Let's have a look to our application: it has just 2 files: src/index.js (the entry point) and src/dynamic.js (just a simple function for import() test).

src/index.js has a class LazyLoader, which wraps import('../somthing') with a retrier.

If you look closer to views/index.html, you can see, what there are two scripts:

```html
<script src="http://localhost:3000/dist/dynamic.js" async></script>
<script src="http://localhost:3000/dist/main.js"></script>
```

In general, it is not necessary to include a script tag with src to dynamic.js, cause webpack fetches it by itself. But where can be some cases, when I need to preload a dynamic js file via <script async>. For example, this is a recommended way to preload js-files in [React 18](https://github.com/reactwg/react-18/discussions/114). So, in that case, when the dynamic js is preloaded, and where is a error during its loading, webpack waits as many seconds, as it was set in webpack.config.js/chunkLoadTimeout
And retry starts only after that timeout.

Everything works perfect without preload (just try to remove sync script and restart the server). Retring starts after 2 seconds. But it breaks with preload via async script. In that case, retring starts after 7 seconds (chunkLoadTimeout + 2 seconds).
