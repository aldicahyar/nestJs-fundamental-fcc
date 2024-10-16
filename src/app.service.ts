import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(private devConfigService: DevConfigService,
    @Inject('CONFIG')
    private config: { port: string },
  ) { }
  getHello(): string {
    return `Hellow I am Learning Nest.js fundamentals ${this.devConfigService.getDBHOST()} 
    PORT : ${this.config.port}`;
  }
}
