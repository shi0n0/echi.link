globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_1w3G6ad8.mjs';
import './chunks/astro/server_CkkThTsN.mjs';
import { s as sequence } from './chunks/index_CKRcUchY.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
