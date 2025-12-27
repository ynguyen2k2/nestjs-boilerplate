import { Strategy } from 'passport-anonymous'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super()
  }

  public validate(payload: unknown, request: unknown): unknown {
    return request
  }
}
