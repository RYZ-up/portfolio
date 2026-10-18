// Every hour: checks the services of the API Status card and records the
// results (see netlify/lib/status.mjs).
import { checkAll, record } from '../lib/status.mjs';

export default async () => {
  await record(await checkAll());
};

export const config = { schedule: '@hourly' };
