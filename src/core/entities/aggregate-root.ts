import { Entity, EntityWithTimestamps } from './entity'

export abstract class AggregateRoot<TProps> extends Entity<TProps> {}

export abstract class AggregateRootWithTimestamps<
  TProps,
> extends EntityWithTimestamps<TProps> {}
