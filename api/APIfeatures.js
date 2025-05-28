class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    console.log(queryObj)
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    console.log(queryObj);
    // 1B) Advanced filtering for gte/gt/lte/lt
    const filters = {};
    for (const key in queryObj) {
      const match = key.match(/(.*)\[(gte|gt|lte|lt)\]/);
      if (match) {
        const field = match[1];
        const operator = `$${match[2]}`;
        if (!filters[field]) filters[field] = {};
        filters[field][operator] = Number(queryObj[key]);
      } else {
        filters[key] = queryObj[key];
      }
    }

    this.query = this.query.find(filters);

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      //sort('price rating')
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }
    // sort by default
    else {
      this.query = this.query.sort('-createdAt')
    }
    return this
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    else {
      this.query.select('-__v');
    }
    return this
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

module.exports = APIfeatures;