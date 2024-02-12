import { Injectable, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerInfoService {

  constructor(private logger: NGXLogger) {
  }

  public showTrace(): void {
    this.logger.trace('TRACE level');
  }

  public showDebug(): void {
    this.logger.debug('DEBUG level');
  }

  public showInfo(): void {
    this.logger.info('INFO level');
  }

  public showWarn(): void {
    this.logger.warn('WARN level');
  }

  public showError(): void {
    this.logger.error('ERROR level');
  }

  public showFatal(): void {
    this.logger.fatal('FATAL level');
  }
}
