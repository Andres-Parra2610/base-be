import { Injectable } from "@nestjs/common";
import { AppEvents } from "./events";

@Injectable()
export class EventBus {
  private handlers: {
    [K in keyof AppEvents]?: Array<
      (payload: AppEvents[K]['payload']) => AppEvents[K]['response'] | Promise<AppEvents[K]['response']>
    >
  } = {};

  on<K extends keyof AppEvents>(
    event: K,
    handler: (payload: AppEvents[K]['payload']) => AppEvents[K]['response'] | Promise<AppEvents[K]['response']>
  ) {
    if (!this.handlers[event]) this.handlers[event] = [];
    this.handlers[event]!.push(handler);
  }

  emit<K extends keyof AppEvents>(
    event: K,
    payload: AppEvents[K]['payload']
  ): AppEvents[K]['response'][] {
    const handlers = this.handlers[event] || [];
    return handlers.map(h => h(payload));
  }

  async emitAsync<K extends keyof AppEvents>(
    event: K,
    payload: AppEvents[K]['payload']
  ): Promise<AppEvents[K]['response'][]> {
    const handlers = this.handlers[event] || [];
    const results: AppEvents[K]['response'][] = [];
    for (const h of handlers) {
      results.push(await h(payload));
    }
    return results;
  }

  async emitAndWait<K extends keyof AppEvents>(
    event: K,
    payload: AppEvents[K]['payload']
  ): Promise<AppEvents[K]['response']> {
    const results = await this.emitAsync(event, payload);
    return results[0];
  }
}
