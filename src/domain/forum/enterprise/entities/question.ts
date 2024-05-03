import {
  EntityWithTimestamps,
  Timestamps,
} from '@/core/entities/entity-with-timestamps'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Slug } from './value-objects/slug'

interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId: UniqueEntityId | null
  title: string
  content: string
  slug: Slug
}

export class Question extends EntityWithTimestamps<QuestionProps> {
  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  set bestAnswerId(value: UniqueEntityId | null) {
    this.props.bestAnswerId = value
    this.onUpdate()
  }

  get title() {
    return this.props.title
  }

  set title(value: string) {
    this.props.title = value
    this.props.slug = Slug.createFromText(value)
    this.onUpdate()
  }

  get content() {
    return this.props.content
  }

  set content(value: string) {
    this.props.content = value
    this.onUpdate()
  }

  get slug() {
    return this.props.slug
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  constructor(
    props: Optional<QuestionProps, 'slug'> & Partial<Timestamps>,
    id?: UniqueEntityId | string,
  ) {
    super(
      {
        slug: Slug.createFromText(props.title),
        ...props,
      },
      id,
    )
  }
}
