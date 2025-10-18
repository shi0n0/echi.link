/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    runtime: {
      env: {
        ECHI_DB: any; // 必要に応じて D1Database などに置換
      };
    };
  }
}
