import { EntityWithTimestamps } from '@/core/entities/entity-with-timestamps'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface AnswerProps {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
}

export class Answer extends EntityWithTimestamps<AnswerProps> {
  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get content() {
    return this.props.content
  }

  set content(value: string) {
    this.props.content = value
    this.onUpdate()
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }
}
