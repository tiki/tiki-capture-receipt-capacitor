import './assets/main.css';
import { createApp } from 'vue';
import { ReceiptCapture } from '../../src/receipt-capture';
import type { ReceiptCapturePlugin } from '@/receipt-capture-plugin';
import { registerPlugin } from '@capacitor/core';

import App from '@/app.vue';

const plugin: ReceiptCapturePlugin = registerPlugin<ReceiptCapturePlugin>('ReceiptCapture', {
  web: () => import('../../src/receipt-capture-web').then((m) => new m.ReceiptCaptureWeb()),
});

const instance: ReceiptCapture = new ReceiptCapture(plugin);

export const login = async (username: string, password: string, source: string) => {
  console.log('login', username, password, source)
  try{
   await instance.login(source, username, password).catch((error) => console.log(error));
  } catch (error) {
    console.log(error)
    return error
  }
} 

export const accounts = async () => {
  try{
  console.log('account')
  console.log(await instance.accounts());
  } catch(error){
    console.log(error)
    return error
  }
};

export const scanEmail = async () => {

  try {
    instance.scan('EMAIL').then((scan) => {
      console.log(scan);
    });
  } catch (e) {
    return e
    console.log(e);
  }
};

export const scanRetailer = async () => {
  try {
    instance.scan('RETAILER').then((scan) => {
      console.log(scan);
    });
  } catch (e) {
    console.log('scan error')
    console.log(e);
  }
};

export const logout = async () => {
  console.log(await instance.logout());
};

export const initialize = async () => {
  console.log('teste initialize');
  await instance.initialize(
    'sRwAAAAoY29tLm15dGlraS5zZGsuY2FwdHVyZS5yZWNlaXB0LmNhcGFjaXRvcgY6SQlVDCCrMOCc/jLI1A3BmOhqNvtZLzShMcb3/OLQLiqgWjuHuFiqGfg4fnAiPtRcc5uRJ6bCBRkg8EsKabMQkEsMOuVjvEOejVD497WkMgobMbk/X+bdfhPPGdcAHWn5Vnz86SmGdHX5xs6RgYe5jmJCSLiPmB7cjWmxY5ihkCG12Q==',
    'wSNX3mu+YGc/2I1DDd0NmrYHS6zS1BQt2geMUH7DDowER43JGeJRUErOHVwU2tz6xHDXia8BuvXQI3j37I0uYw==',
  );
};

createApp(App).mount('#app');
