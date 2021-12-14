class LazyLoader {
  constructor(loader) {
    this.loader = loader;
  }

  exec = () => {
    this.importWithRetries().then((res) => res.test());
  };

  importWithRetries = (retriesLeft = 5, interval = 2000) => {
    return new Promise((resolve, reject) => {
      console.log('retries: ', retriesLeft);
      this.loader()
        .then(resolve)
        .catch((error) => {
          if (retriesLeft === 0) {
            reject(error);
            return;
          }

          console.log('retry err: ', error);

          setTimeout(() => {
            console.log('start retry');
            this.importWithRetries(retriesLeft - 1, interval).then(resolve, reject);
          }, interval);
        });
    });
  };
}

const L = new LazyLoader(() => import(/* webpackChunkName: 'dynamic' */ './dynamic'));

function main() {
  console.log('before dynamic');
  L.exec();
  console.log('after dynamic');
}

main();
