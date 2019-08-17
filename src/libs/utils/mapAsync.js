export async function mapAsync(array, callback) {
  const results = []

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    const result = await callback(array[index], index, array)

    if (result) results.push(result)
  }

  return results
}

export async function flatMapAsync(array, callback) {
  const results = []

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    const result = await callback(array[index], index, array)

    if (result && result.length) results.push(...result)
  }

  return results
}
