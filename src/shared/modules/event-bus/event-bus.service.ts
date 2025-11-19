import { Injectable } from "@nestjs/common";

type EventHandler<T = any, R = any> = (payload: T) => R | Promise<R>;

@Injectable()
export class EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();

  on<T = any, R = any>(event: string, handler: EventHandler<T, R>) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this?.handlers?.get(event)?.push(handler);
  }

  // Emit sincrónico
  emit<T = any, R = any>(event: string, payload: T): R[] {
    const handlers = this.handlers.get(event) || [];
    return handlers.map(handler => handler(payload));
  }

  // Emit asincrónico y serial, esperando resultados
  async emitAsync<T = any, R = any>(event: string, payload: T): Promise<R[]> {
    const handlers = this.handlers.get(event) || [];
    const results: R[] = [];
    for (const handler of handlers) {
      results.push(await handler(payload));
    }
    return results;
  }

  // Emit y tomar solo el primer resultado (útil para “esperar respuesta”)
  async emitAndWait<T = any, R = any>(event: string, payload: T): Promise<R> {
    const results = await this.emitAsync<T, R>(event, payload);
    return results[0]; // o aplicar alguna lógica si hay varios handlers
  }
}
