import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  findById(id: string | UniqueEntityId): Promise<Question | null>
  findBySlug(slug: string | Slug): Promise<Question | null>
}
