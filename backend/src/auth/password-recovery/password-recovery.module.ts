import { Module } from '@nestjs/common'



import { PasswordRecoveryController } from './password-recovery.controller'
import { PasswordRecoveryService } from './password-recovery.service'
import { MailService } from 'src/libs/mail/mail.service'
import { UserService } from 'src/user/user.service'

@Module({
	controllers: [PasswordRecoveryController],
	providers: [PasswordRecoveryService, UserService, MailService]
})
export class PasswordRecoveryModule {}
