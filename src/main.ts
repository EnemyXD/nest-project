import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './providers/exceptionFilters/HttpExceptionFilter';
import { DtoInterceptor } from './providers/interceptors/DTO.interceptor';
import admin from 'firebase-admin';
import firebaseAccountCredential from './path/to/serviceAccountKey.json';

async function bootstrap() {
  const serviceAccount = firebaseAccountCredential as admin.ServiceAccount;
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail:
        'firebase-adminsdk-i1d6u@nest-netology.iam.gserviceaccount.com',
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+TIWRQ85Qbzlo\ndvUOZ3bgn5ZJ4fbzBWTgxWD620w59G74yuOPmH+Gk+JfOULoF36pidVEVlsacf+h\n34P1cWQb/3vy2fIqYG2eIbMCetgGWS9u3fecGEOPM5u6H/an+PkPQYXdk4DqKK0I\npEv6BNw/cwH15XZsj9dB+WdXheOmBkgMPkgNXF5Lz3pPWxQxG52hUUqM63MmFDRL\n8SWDKcpnRHEYxw351Yd2dTV9muHQMXz3fEVKzp1aUy3GVA8KXu/TSGQU0zvdxpgj\notFag7BXvGQWDX1NRpH2dWejQcXp8bhYcK2hWguLrDULT+eHL9Hmgowtv/lRjXN0\ntlcxyvBNAgMBAAECggEALtiNF+/SefQLdJc2J9vaBJ1cpKb7ASPOi9OjFlYGa4zs\nBZSClP6kRBejJjBlM1fXTzqWVNqSVk4CcVGh/Tmy/H51/5hd+EchLQicNevSQqvR\nVLBRTGyfswCwIQ9Ny9drTnFhmCR/24T0Zbh2WJ+6LWdtL+CTONHnGn9gTIgx/JRJ\nQ5Nm5ejX5WuruQpdHWMTh1nCikFCGIwjRdfz3Lz3/ObAGiWkYybxjDdPtfM6OTan\ndPXLGk0wjMy/ZoeaDCX010JziI6mBqBI3NNxlr/NJyz78zy2s6NjU8buUN6XO7VF\n11Y1FtTYPu/SPPvfMCp3s7kZKu63WDIk7cIzxq7T6QKBgQD6CCKUfsa1OwB9eecj\nRFiMGD0824vejhpIi9J0gJoL0v1me8ohhfN/F3QRFR0VA2ho7KaZmM1KTJOxu4Xv\nHNETk3sUYOFc+DKMAIZLnbPeQsE1UcVKZHezIJCfXuWV9OkljUaKgKNnanoGD7pr\n3ucXnuMYsFHacCA9B2Hzi/bfJQKBgQDC12DJVamtRDYdTtcwJnlrUSGzmlgpHqy7\nClmfEoTxWruhZCQ5SsKXYrEnTs5p8rk1LjZG8eNyl1ptTPA5N6MZgfJLbivFaqYs\nMka2YJwDfqu48MHLkH+EEJi+/M0yUBE3deLTBbUYxQ/wHAcoV7VpoeLmL67538nW\n1jK8qQk4CQKBgQCZXjQX8kvhDvgV/5iQQXQvOw8VLXZ2ZaQpq9rEK75SUnGtU3GB\nbrEV3EUN1W2pXhXFhqQKw3fpg191PhnBumNlJqnwrhyO8o/O4ON/rpSOWVQ6aJYk\nM8xYzDjqCUO64CfDKQ2EF7Qj02RWI3+ue2Q1UPjsQ/txiiW8SbMDuW8NIQKBgCv+\nkd4kN5HmCwoHGVPH/DadNSzmtu1h/cKmDaJ7fgU5ZZCFmiBNny6rnDCx/K2zntpB\nOwQ97gub3VE8xClHRM6nptwdXkjPUgI8v/bCTbgETCYQRtH+KKzbSoIldvfbWGfb\neIIJkeCr7nNbAMq9MztM0H0FW08UlvCpoP80c95xAoGAFE3HDK4dP/DF7gLJSSgE\nxW/i8YvFJcNPyqZcbMTQcOlFROm7KLB76c1q/vgigPY0LFytdW+69FXFmck4Ia7t\ndwELXifkYtjSgElaxxlj6hAI9VBH/y+Q2t9GtQ6FU9Vrn6TsZUZZvEiskufaGVXC\nzfoepPFzDG3gM+3EqgtR9q8=\n-----END PRIVATE KEY-----\n',
      projectId: 'nest-netology',
    }),
    databaseURL:
      'https://nest-netology-default-rtdb.europe-west1.firebasedatabase.app',
  });

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new DtoInterceptor());
  await app.listen(3000);
}
bootstrap();
