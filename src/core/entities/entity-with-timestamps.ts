import { Entity } from './entity'
import { UniqueEntityId } from './unique-entity-id'

export interface Timestamps {
  createdAt: Date
  updatedAt: Date | null
}

export abstract class EntityWithTimestamps<TProps> extends Entity<
  TProps & Timestamps
> {
  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  constructor(
    props: TProps & Partial<Timestamps>,
    id?: string | UniqueEntityId,
  ) {
    super(
      {
        createdAt: new Date(),
        updatedAt: null,
        ...props,
      },
      id,
    )
  }

  protected onUpdate() {
    this.props.updatedAt = new Date()
  }
}
