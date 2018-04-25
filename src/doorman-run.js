#!/usr/bin/env node

import AJV from 'ajv';

import setupDashButtonTrigger from './triggers/dashButtons';
import appConfigSchema from './schemas/appConfig.json';
import config from './config.json';

const ajv = new AJV(); // options can be passed, e.g. {allErrors: true}
const validateAppConfig = ajv.compile(appConfigSchema);

if (!validateAppConfig(config)) {
  console.error('Invalid Application Configuration');
  console.error(validateAppConfig.errors);
  throw new Error('Invalid Application Configuration');
}

if (config.dashConfig.buttons && Object.keys(config.dashConfig.buttons).length) {
  setupDashButtonTrigger(config);
}

console.info('Doorman service started.');
