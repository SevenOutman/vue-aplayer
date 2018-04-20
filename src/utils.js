/**
 * Parse lrc, suppose multiple time tag
 * @see https://github.com/MoePlayer/APlayer/blob/master/src/js/lrc.js#L83
 * @author DIYgod(https://github.com/DIYgod)
 *
 * @param {String} lrc_s - Format:
 * [mm:ss]lyric
 * [mm:ss.xx]lyric
 * [mm:ss.xxx]lyric
 * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
 * [mm:ss.xx]<mm:ss.xx>lyric
 *
 * @return {String} [[time, text], [time, text], [time, text], ...]
 */
export function parseLrc (lrc_s) {
  if (lrc_s) {
    lrc_s = lrc_s.replace(/([^\]^\n])\[/g, (match, p1) => p1 + '\n[')
    const lyric = lrc_s.split('\n')
    const lrc = []
    const lyricLen = lyric.length
    for (let i = 0; i < lyricLen; i++) {
      // match lrc time
      const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g)
      // match lrc text
      const lrcText = lyric[i].replace(/.*\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g, '').replace(/<(\d{2}):(\d{2})(\.(\d{2,3}))?>/g, '').replace(/^\s+|\s+$/g, '')

      if (lrcTimes) {
        // handle multiple time tag
        const timeLen = lrcTimes.length
        for (let j = 0; j < timeLen; j++) {
          const oneTime = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(lrcTimes[j])
          const min2sec = oneTime[1] * 60
          const sec2sec = parseInt(oneTime[2])
          const msec2sec = oneTime[4] ? parseInt(oneTime[4]) / ((oneTime[4] + '').length === 2 ? 100 : 1000) : 0
          const lrcTime = min2sec + sec2sec + msec2sec
          lrc.push([lrcTime, lrcText])
        }
      }
    }
    // sort by time
    lrc.sort((a, b) => a[0] - b[0])
    return lrc
  }
  else {
    return []
  }
}

/**
 * Compare two semantic versions(major.minor.patch)
 */
export function versionCompare (semantic1, semantic2) {
  if (semantic1 === semantic2) {
    return 0
  }
  const [major1, minor1, patch1] = semantic1.split('.').map(Number)
  const [major2, minor2, patch2] = semantic2.split('.').map(Number)

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

export function warn (message) {
  return console.warn(`[Vue-APlayer] ${message}`)
}

export function deprecatedProp (name, sinceVersion, alternative) {
  return warn(`'${name}' is deprecated since v${sinceVersion}, and will be removed in future releases, use '${alternative}' instead`)
}

export function getElementViewLeft (element) {
  let actualLeft = element.offsetLeft
  let current = element.offsetParent
  let elementScrollLeft
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }
  elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft
  return actualLeft - elementScrollLeft
}

export function getElementViewTop (element) {
  let actualTop = element.offsetTop
  let current = element.offsetParent
  let elementScrollTop
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  elementScrollTop = document.body.scrollTop + document.documentElement.scrollTop
  return actualTop - elementScrollTop
}
