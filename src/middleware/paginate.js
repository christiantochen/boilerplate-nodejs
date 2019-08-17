const defaultPage = 1
const defaultLimit = 10

export const paginate = async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { page = defaultPage, limit = defaultLimit } = req.query

  req.query.offset = (page - 1) * limit
  req.query = _.pick(req.query, ['sort', 'offset', 'limit', 'search', 'searchFields', 'fields'])

  res.page = (data, count) => {
    const currentPage = Number(page)
    const totalPage = Math.ceil(count / limit)

    // eslint-disable-next-line no-underscore-dangle
    const { pathname } = req._parsedUrl
    const url = `${req.protocol}://${req.get('host')}${pathname}`

    const meta = { count, limit, currentPage, totalPage }
    const link = {}

    if (currentPage !== 1) link.first = `${url}?page=1&limit=${limit}`
    if (currentPage > 1) link.prev = `${url}?page=${currentPage - 1}&limit=${limit}`
    if (currentPage !== totalPage) link.last = `${url}?page=${totalPage}&limit=${limit}`
    if (currentPage < totalPage) link.next = `${url}?page=${currentPage + 1}&limit=${limit}`

    res.send({ data, meta, link })
  }

  next()
}
