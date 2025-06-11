interface RrrebPlainToken {
  s: number // start index in the transcript
  l: number // length of the token in the transcript
  tc: [number, number] // start time and duration
}

interface RrrebToken {
  idx: number
  text: string
  startTime: number
  endTime: number
  start: number // start index in the transcript
  end: number // end index in the transcript
}

interface MockData {
  transcript: string
  ub_plain: number[]
  rrreb_plain: {
    id: string
    t: RrrebPlainToken[]
  }[]
}

interface Utterance {
  startTime: number
  endTime: number
  indices: number[]
}

export const generateRrrebsFromTranscript = (
  mockdata: MockData,
  id: string
): RrrebToken[] => {
  const rrreb = mockdata.rrreb_plain.find((d) => d.id === id)
  if (!rrreb) {
    console.warn(`No rrreb_plain data found for id: ${id}`)
    return []
  }

  const grouped: RrrebToken[] = []
  let buffer: RrrebToken[] = []
  let tokenCount = 0
  let rrrebIdx = 0

  const tokens: RrrebToken[] = rrreb.t.map(
    (token: RrrebPlainToken, i: number) => {
      const start = token.s
      const length = token.l
      const text = mockdata.transcript.slice(start, start + length)
      const startTime = token.tc[0]
      const duration = token.tc[1]
      const endTime = startTime + duration
      return { text, startTime, endTime, start, end: start + length, idx: i }
    }
  )

  const createGroupedToken = (
    buffer: RrrebToken[],
    idx: number
  ): RrrebToken => {
    // Extract text directly from transcript using start/end indices
    const mergedStart = buffer[0].start
    const mergedEnd = buffer[buffer.length - 1].end
    const mergedText = mockdata.transcript.slice(mergedStart, mergedEnd)

    const startTime = buffer[0].startTime
    const endTime = buffer[buffer.length - 1].endTime

    return {
      text: mergedText,
      startTime,
      endTime,
      idx,
      start: mergedStart,
      end: mergedEnd,
    }
  }

  tokens.forEach((token, index) => {
    buffer.push(token)
    tokenCount++

    // Improved punctuation detection
    const endsWithPunctuation = /[.!?;:]$/.test(token.text.trim())
    const isMaxGroupSize = tokenCount >= 10
    const isLastToken = index === tokens.length - 1

    // More consistent grouping logic
    const shouldGroupNow =
      (endsWithPunctuation && tokenCount >= 2) || // At least 2 tokens for punctuation-based grouping
      isMaxGroupSize ||
      isLastToken

    if (shouldGroupNow) {
      grouped.push(createGroupedToken(buffer, rrrebIdx))
      rrrebIdx++
      buffer = []
      tokenCount = 0
    }
  })

  // Handle any remaining tokens in the buffer
  if (buffer.length > 0) {
    grouped.push(createGroupedToken(buffer, rrrebIdx))
  }

  return grouped
}
// // }
// console.log(
//   'enrichedTranscript',
//   JSON.stringify(
//     processUtteranceBreaks(mockdata as unknown as MockData),
//     null,
//     2
//   )
// )

export const processMockdata = (
  mockdata: MockData,
  id: string
): { utterances: Utterance[]; rrrebs: RrrebToken[] } => {
  const rrrebTokens: RrrebToken[] = generateRrrebsFromTranscript(mockdata, id)
  const utterances: Utterance[] = []
  // add 0 to the beginning of ub_plain if not present
  if (mockdata.ub_plain[0] !== 0) {
    mockdata.ub_plain.unshift(0)
  }
  for (let i = 0; i < mockdata.ub_plain.length - 1; i++) {
    const startIdx = mockdata.ub_plain[i]
    const endIdx = mockdata.ub_plain[i + 1]

    // Find tokens within this range
    const rrrebTokensInRange = rrrebTokens.filter(
      (t) => t.start >= startIdx && t.end < endIdx
    )

    if (rrrebTokensInRange.length === 0) continue // skip if no tokens

    const startTime = rrrebTokensInRange[0].startTime
    const lastToken = rrrebTokensInRange[rrrebTokensInRange.length - 1]
    const endTime = lastToken.endTime // start + duration

    utterances.push({
      startTime,
      endTime,
      indices: rrrebTokensInRange.map((t) => t.idx),
    })
  }

  return {
    utterances,
    rrrebs: rrrebTokens,
  }
}
