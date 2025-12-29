import { Injectable, Scope, ConsoleLogger } from '@nestjs/common'

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  customLog() {
    this.log('Please put logger in this here!')
  }
}
export const myLogger = new MyLogger()
