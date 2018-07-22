exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stock').del()
    .then(function () {
        const stocks = [

            {
                companyId:'C1',
                countries:'US, FR',
                budget:'1$',
                bid:'10 cent',
                category:'Automobile, Finance'
            },
            {
                companyId:'C2',
                countries:'IN, US',
                budget:'2$',
                bid:'30 cent',
                category:'Finance, IT'
            },
            {
                companyId:'C3',
                countries:'US, RS',
                budget:'3$',
                bid:'5 cent',
                category:'IT, Automobile'
            }
        ];
        return knex('stock').insert(stocks);
    });
};
