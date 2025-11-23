import { UIMessage } from 'ai';
import { Equals, IsString } from 'class-validator';

import { IsValidUiMessageArray } from '../../decorators/ai/ui-message';

export class ChatMessageDto {
  @IsValidUiMessageArray()
  messages: UIMessage[];

  @IsString()
  id: string;

  @IsString()
  @Equals('submit-message')
  trigger: string;
}
