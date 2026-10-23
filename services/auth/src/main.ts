import 'reflect-metadata';
import { bootstrap } from '@retcon/platform';
import { AppModule } from './app.module';
import { SERVICE_NAME } from './shared/constants/service.constants';

void bootstrap(AppModule, SERVICE_NAME).catch(() => {
  console.error('auth startup failed; check configuration and dependencies');
  process.exitCode = 1;
});
