import { Global, Module, OnModuleInit } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService } from '@nestjs/core';
import { EventBus } from './event-bus.service';


@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [EventBus],
  exports: [EventBus],
})
export class EventBusModule implements OnModuleInit {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly eventBus: EventBus,
  ) { }

  onModuleInit() {
    const providers = this.discovery.getProviders();
    for (const wrapper of providers) {
      const instance = wrapper.instance;
      if (!instance || !instance.constructor._asyncEventListeners) continue;

      for (const listener of instance.constructor._asyncEventListeners) {
        this.eventBus.on(listener.eventName, async (payload) => {
          await instance[listener.methodName](payload);
        });
      }
    }
  }
}
