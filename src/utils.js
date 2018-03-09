/**
 * Parse lrc, suppose multiple time tag
 *
 * @param {String} lrc_s - Format:
 * [mm:ss.xx]lyric
 * [mm:ss.xxx]lyric
 * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
 *
 * @return {String} [[time, text], [time, text], [time, text], ...]
 */
export const parseLrc = (lrc_s) => {
  const lyric = lrc_s.split('\n')
  let lrc = []
  const lyricLen = lyric.length
  for (let i = 0; i < lyricLen; i++) {
    // match lrc time
    const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g)
    // match lrc text
    const lrcText = lyric[i].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g, '').replace(/^\s+|\s+$/g, '')

    if (lrcTimes != null) {
      // handle multiple time tag
      const timeLen = lrcTimes.length
      for (let j = 0; j < timeLen; j++) {
        const oneTime = /\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(lrcTimes[j])
        const lrcTime = (oneTime[1]) * 60 + parseInt(oneTime[2]) + parseInt(oneTime[3]) / ((oneTime[3] + '').length === 2 ? 100 : 1000)
        lrc.push([lrcTime, lrcText])
      }
    }
  }
  // sort by time
  lrc.sort((a, b) => a[0] - b[0])
  return lrc
}

/**
 * Compare two semantic versions(major.minor.patch)
 */
export function versionCompare (semantic1, semantic2) {
  if (semantic1 === semantic2) {
    return 0
  }
  const [major1, minor1, patch1] = semantic1.split('.')
  const [major2, minor2, patch2] = semantic2.split('.')

  if (major1 > major2) {
    return 1
  } else if (major1 === major2) {
    if (minor1 > minor2) {
      return 1
    } else if (minor1 === minor2) {
      if (patch1 > patch2) {
        return 1
      }
    }
  }
  return -1
}