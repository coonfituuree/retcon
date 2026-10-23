import { createConfiguration } from '@retcon/platform';
import { SERVICE_NAME } from '../shared/constants/service.constants';

export default function configuration() {
  return createConfiguration(SERVICE_NAME);
}
