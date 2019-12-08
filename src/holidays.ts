const now = new Date()

enum Holiday {
  Normal = 'normal',
  Christmas = 'christmas',
}

const zeroPrefix = (n: number) => `${n < 10 ? '0' : ''}${n}`

// Numbers are dates represented as `{month}{day}`
const matrix: Array<[number, number, Holiday]> = [
  [1115, 1231, Holiday.Christmas],
]

export const getHoliday = (): Holiday => {
  const date = Number(
    `${now.getMonth() + 1}${zeroPrefix(now.getDate())}`,
  )

  const found = matrix.find(([min, max]) => {
    return date >= min || date <= max
  })

  return found?.[2] ?? Holiday.Normal
}
