import http from 'k6/http';
import { sleep, check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(99)<1500'],
  },
  vus: 16,
  duration: '30s',
}

// test ALL ROUTES AT ONCE
export default function () {
  const randomProductId = randomIntBetween(900000, 1000011);
  // const randomProductId = randomIntBetween(1, 1);
  const productURL = `http://localhost:3002/products/${randomProductId}`
  const stylesURL = `http://localhost:3002/products/${randomProductId}/styles`
  const relatedURL = `http://localhost:3002/products/${randomProductId}/related`
  const res1 = http.get(productURL);
  const res2 = http.get(stylesURL);
  const res3 = http.get(relatedURL);

  // CHECK FOR CACHE HIT/CACHE MISS
  check(res1, {
    '# prod_id cache hit': (res1) => res1.json().source === 'cache'
  })
  check(res1, {
    '# prod_id cache miss': (res1) => res1.json().source === 'DB'
  })

  check(res2, {
    '# styles cache hit': (res2) => res2.json().source === 'cache'
  })
  check(res2, {
    '# styles cache miss': (res2) => res2.json().source === 'DB'
  })
  check(res3, {
    '# related cache hit': (res) => {
      const json = res.json()
      const lastValue = json[json.length - 1];
      return lastValue === 'cache';
    }
  })
  check(res3, {
    '# related cache miss': (res) => {
      const json = res.json()
      const lastValue = json[json.length - 1];
      return lastValue === 'DB';
    }
  })
}

// export function handleSummary(data) {
//   return {
//     'stdout': textSummary(data, { indent: '', enableColors: true }), // Show the text summary to stdout...
//     // 'other/path/to/summary.json': JSON.stringify(data), // and a JSON with all the details...
//   }
// }