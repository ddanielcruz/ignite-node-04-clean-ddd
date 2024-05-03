import { UniqueEntityId } from './unique-entity-id'

export abstract class Entity<TProps> {
  protected props: TProps

  public readonly id: UniqueEntityId

  constructor(props: TProps, id?: string | UniqueEntityId) {
    this.props = props
    this.id = id instanceof UniqueEntityId ? id : new UniqueEntityId(id)
  }
}
