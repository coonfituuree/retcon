import { generateKeyPairSync, randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const envPath = path.join(root, '.env');
const secretsPath = path.join(root, '.secrets');
mkdirSync(secretsPath, { recursive: true, mode: 0o700 });
const privatePath = path.join(secretsPath, 'jwt-private.pem');
const publicPath = path.join(secretsPath, 'jwt-public.pem');
if (existsSync(privatePath) !== existsSync(publicPath)) {
  throw new Error('Incomplete JWT key pair; restore the missing file before continuing');
}
if (!existsSync(privatePath)) {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 3072,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
  writeFileSync(privatePath, privateKey, { flag: 'wx', mode: 0o600 });
  writeFileSync(publicPath, publicKey, { flag: 'wx', mode: 0o644 });
}
if (!existsSync(envPath)) {
  const secret = () => randomBytes(24).toString('hex');
  let env = readFileSync(path.join(root, '.env.example'), 'utf8');
  for (const name of ['auth']) {
    const password = secret();
    env = env.replace(
      `${name.toUpperCase()}_DB_PASSWORD=replace-with-generated-secret`,
      `${name.toUpperCase()}_DB_PASSWORD=${password}`,
    );
    env = env.replace(
      `postgresql://retcon_${name}:replace-with-generated-secret`,
      `postgresql://retcon_${name}:${password}`,
    );
  }
  writeFileSync(envPath, env, { flag: 'wx', mode: 0o600 });
}
console.log('Local environment and JWT keys are ready. Existing files were preserved.');
