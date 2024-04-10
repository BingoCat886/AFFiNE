import { ServerFeature } from '../../core/config';
import { QuotaService } from '../../core/quota';
import { PermissionService } from '../../core/workspaces/permission';
import { Plugin } from '../registry';
import { CopilotController } from './controller';
import { PromptService } from './prompt';
import {
  assertProvidersConfigs,
  CopilotProviderService,
  OpenAIProvider,
  registerCopilotProvider,
} from './providers';
import { CopilotResolver, UserCopilotResolver } from './resolver';
import { ChatSessionService } from './session';

registerCopilotProvider(OpenAIProvider);

@Plugin({
  name: 'copilot',
  providers: [
    PermissionService,
    QuotaService,
    ChatSessionService,
    CopilotResolver,
    UserCopilotResolver,
    PromptService,
    CopilotProviderService,
  ],
  controllers: [CopilotController],
  contributesTo: ServerFeature.Copilot,
  if: config => {
    if (config.flavor.graphql) {
      return assertProvidersConfigs(config);
    }
    return false;
  },
})
export class CopilotModule {}

export type { CopilotConfig } from './types';