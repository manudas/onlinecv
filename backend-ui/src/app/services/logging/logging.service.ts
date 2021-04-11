import { isDevMode } from "@angular/core"

enum Level {
  'error',
  'log',
  'warn'
}

export const log = ({
    level = Level.log,
    messages = []
  }: {
    level?: Level
    messages?: Array<any> | any
  } = {}): void => isDevMode() ? console[Level[level]] (...(Array.isArray(messages) ? messages : [messages])) : null

export const logEasy = (...messages: Array<any>) => log({messages: messages})