import { MaClient } from '../ma'

export class Nekolizer {
  constructor(private client: MaClient) {}

  async nekolize(sentence: string): Promise<string> {
    let result = ''
    const {
      ResultSet: { ma_result }
    } = await this.client.parse(sentence)
    const words =
      ma_result.word_list.word instanceof Array
        ? ma_result.word_list.word
        : [ma_result.word_list.word]
    let deltaPos = ''

    for (const word of words) {
      const isLast = word === words[words.length - 1]
      console.log(word)
      if (
        ['た', 'だ', 'です'].find(f => word.surface === f) &&
        word.pos === '助動詞'
      ) {
        result += word.surface + 'にゃ'
      } else if (
        ['か', 'こそ'].find(f => word.surface === f) &&
        word.pos === '助詞'
      ) {
        result += word.surface + 'にゃ'
      } else if (
        ['ね', 'な'].find(f => word.surface === f) &&
        word.pos === '助詞' &&
        deltaPos !== '助動詞'
      ) {
        if (deltaPos !== '助動詞') result += 'にゃ'
      } else if (
        ['ます'].find(f => word.surface === f) &&
        word.pos === '動詞'
      ) {
        result += word.surface + 'にゃ'
      } else if (word.pos === '名詞' && isLast) {
        result += word.surface + 'にゃ'
      } else if (word.pos === '感動詞' && isLast) {
        result += word.surface + 'にゃ'
      } else {
        result += word.surface
          .split('')
          .map(c => {
            if (c === 'な') return 'にゃ'
            return c
          })
          .join('')
      }
      deltaPos = word.pos
    }

    return result
  }
}
