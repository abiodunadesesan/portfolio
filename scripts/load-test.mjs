import autocannon from "autocannon";

const targetUrl = process.env.LOAD_TEST_URL || "http://127.0.0.1:3000";
const connections = Number(process.env.LOAD_TEST_CONNECTIONS || 40);
const duration = Number(process.env.LOAD_TEST_DURATION || 20);

console.log(`Running load test on ${targetUrl}`);
console.log(`Connections: ${connections}, Duration: ${duration}s`);

const result = await new Promise((resolve, reject) => {
  const instance = autocannon(
    {
      url: targetUrl,
      connections,
      duration,
      pipelining: 1,
      timeout: 10,
    },
    (error, output) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(output);
    }
  );

  autocannon.track(instance, { renderProgressBar: false });
});

const p95 =
  result.latency.p95 ??
  result.latency.p97_5 ??
  result.latency.p99 ??
  result.latency.average;
const avg = result.latency.average;
const errors = (result.errors || 0) + (result.timeouts || 0) + (result.non2xx || 0);
const requestsPerSec = result.requests.average;

console.log("\nLoad test summary");
console.log(`- Avg latency: ${avg}ms`);
console.log(`- P95 latency: ${p95}ms`);
console.log(`- Req/sec: ${Math.round(requestsPerSec)}`);
console.log(`- Total errors+timeouts+non2xx: ${errors}`);

const maxP95 = Number(process.env.LOAD_TEST_MAX_P95 || 800);
const maxErrors = Number(process.env.LOAD_TEST_MAX_ERRORS || 0);

if (p95 > maxP95 || errors > maxErrors) {
  console.error(
    `\nFAILED thresholds (max P95 ${maxP95}ms, max errors ${maxErrors}).`
  );
  process.exit(1);
}

console.log("\nPASSED thresholds.");
