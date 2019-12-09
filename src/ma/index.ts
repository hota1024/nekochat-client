import axios from 'axios'
import xml from 'fast-xml-parser'

export interface MaWord {
  surface: string
  reading: string
  pos: string
  baseform: string
}

export interface MaResult {
  total_count: number
  filltered_count: number
  word_list: { word: MaWord | MaWord[] }
}

export interface ParseResult {
  ResultSet: {
    ma_result: MaResult
  }
}

/**
 * Ma client.
 */
export class MaClient {
  /**
   * Ma client consturctor.
   *
   * @param appId
   */
  constructor(private appId: string) {}

  /**
   * Parse sentence.
   *
   * @param sentence
   */
  async parse(sentence: string): Promise<ParseResult> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await axios.get<any>(
      `https://jlp.yahooapis.jp/MAService/V1/parse`,
      {
        params: {
          sentence,
          appid: this.appId
        }
      }
    )

    const result = xml.parse(data) as ParseResult
    return result
  }
}
