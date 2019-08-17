export const applyFieldsQuery = (model, options) => {
  if (options.fields && typeof options.fields === 'string') {
    const fields = options.fields.split(',')
    const initialExclude = options.attributes?.exclude || []

    const exclude = _.reduce(
      fields,
      (result, value) => {
        if (value[0] === '-') result.push(value.substr(1))
        return result
      },
      initialExclude,
    )

    // eslint-disable-next-line no-param-reassign
    options.attributes = exclude.length > 0 ? { exclude } : fields

    // eslint-disable-next-line no-param-reassign
    delete options.fields
  }
}
