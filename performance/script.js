import http from 'k6/http';
import { sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['avg<200'],
  },
  vus: 4096,
  duration: '60s',
}

// test ALL ROUTES AT ONCE
export default function () {
  const randomProductId = randomIntBetween(900000, 1000011);
  const productURL = `http://localhost:3002/products/${randomProductId}`
  const stylesURL = `http://localhost:3002/products/${randomProductId}/styles`
  const relatedURL = `http://localhost:3002/products/${randomProductId}/related`
  http.get(productURL);
  http.get(stylesURL);
  http.get(relatedURL);
}

// export function handleSummary(data) {
//   return {
//     'stdout': textSummary(data, { indent: '', enableColors: true }), // Show the text summary to stdout...
//     // 'other/path/to/summary.json': JSON.stringify(data), // and a JSON with all the details...
//   }
// }