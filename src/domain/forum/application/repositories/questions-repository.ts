import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
  findBySlug(slug: string | Slug): Promise<Question | null>
}
