import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:4000/getTransaction', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
            "_id": "629c0d5eb48b508f8442116f",
            "months": [
                [
                    100,
                    300,
                    200
                ],
                [
                    340,
                    0,
                    150
                ],
                [
                    400,
                    280,
                    90
                ]
            ],
            "__v": 0
        }
      ]),
    ),
  ),
]