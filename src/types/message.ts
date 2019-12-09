import { User } from './user'

/**
 * Message interface.
 */
export interface Message {
  /**
   * User.
   */
  user: User

  /**
   * Content.
   */
  content: string

  /**
   * Created timestamp.
   */
  createdTimestamp: number
}
