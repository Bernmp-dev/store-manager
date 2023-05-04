const salesListMock = [
  {
    "saleId": 1,
    "date": "2023-05-03T21:15:39.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-05-03T21:15:39.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-05-03T21:15:39.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const salesByIdMock = [
  {
    "saleId": 1,
    "date": "2023-05-03T21:15:39.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-05-03T21:15:39.000Z",
    "productId": 2,
    "quantity": 10
  },
];

const registerSaleMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 3,
    "quantity": 5
  }
]; 

const dataBaseListMock = [
  {
    sale_id: 1,
    product_id: 1,
    quantity: 5,
    date: '2023-05-03T21:15:39.000Z'
  },
  {
    sale_id: 1,
    product_id: 2,
    quantity: 10,
    date: '2023-05-03T21:15:39.000Z'
  },
  {
    sale_id: 2,
    product_id: 3,
    quantity: 15,
    date: '2023-05-03T21:15:39.000Z'
  }
]

const newSale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 3,
      "quantity": 5
    }
  ]
}

module.exports = {
  salesListMock,
  salesByIdMock,
  registerSaleMock,
  dataBaseListMock,
  newSale,
}