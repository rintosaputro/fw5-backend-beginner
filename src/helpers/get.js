/* eslint-disable radix */

const get = (request, response, model, countModel, table) => {
  let { search, page, limit } = request.query;
  search = search || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

  const offset = (page - 1) * limit;
  const data = { search, limit, offset };

  model(data, (results) => {
    if (results.length > 0) {
      return countModel(data, (count) => {
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
    }
    return response.status(404).json({
      success: false,
      message: 'Data not found',
    });
  });
};

module.exports = get;

// const te = 'page, limit, offset, offset';
// const get = (data, request, response, model, countModel, table) => {
//   model(data, (results) => {
//     if (results.length > 0) {
//       return countModel(data, (count) => {
//         const { total } = count[0];
//         const last = Math.ceil(total / data.limit);
//         response.json({
//           success: true,
//           message: `List ${table}`,
//           results,
//           pageInfo: {
//             prev: request.query.page > 1 ? `http://localhost:5000/${table}?page=${request.query.page - 1}` : null,
//             next: request.query.page < last ? `http://localhost:5000/${table}?page=${request.query.page + 1}` : null,
//             totalData: total,
//             currentPage: request.query.page,
//             lastPage: last,
//           },
//         });
//       });
//     }
//     return response.status(404).json({
//       success: false,
//       message: 'Data not found',
//     });
//   });
// };

// module.exports = get;
