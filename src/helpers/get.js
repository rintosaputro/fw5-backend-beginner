/* eslint-disable radix */

const get = (request, response, model, countModel, table) => {
  let { search, page, limit } = request.query;
  search = search || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

  const offset = (page - 1) * limit;
  const data = { search, limit, offset };

  model(data, (results) => {
    countModel(data, (count) => {
      const { total } = count[0];
      const last = Math.ceil(total / limit);
      response.json({
        success: true,
        message: `List ${table}`,
        results,
        pageInfo: {
          prev: page > 1 ? `http://localhost:5000/${table}?page=${page - 1}` : null,
          next: page < last ? `http://localhost:5000/${table}?page=${page + 1}` : null,
          totalData: total,
          currentPage: page,
          lastPage: last,
        },
      });
    });
  });
};

module.exports = get;
