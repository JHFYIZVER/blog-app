import { EmailConfirmationModule } from './auth/email-confirmation/email-confirmation.module';
import { PasswordRecoveryModule } from './auth/password-recovery/password-recovery.module';
import { ImageProcessingModule } from './post/image-processing/image-processing.module';
import { TwoFactorAuthModule } from './auth/two-factor-auth/two-factor-auth.module';
import { ProviderModule } from './auth/provider/provider.module';
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './libs/mail/mail.module';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ProviderModule,
    MailModule,
    EmailConfirmationModule,
    PasswordRecoveryModule,
    TwoFactorAuthModule,
    PostModule,
    ImageProcessingModule,
    LikeModule,
  ],
})
export class AppModule {}
