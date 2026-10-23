const service = process.env.SERVICE;
const port = process.env[`${service?.toUpperCase()}_PORT`];
try {
  const response = await fetch(`http://127.0.0.1:${port}/api/v1/health/ready`, {
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) process.exitCode = 1;
} catch {
  process.exitCode = 1;
}
