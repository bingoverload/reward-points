import {render, screen, waitFor, cleanup} from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import TableData from '../components/TableData'
import Page404 from '../components/Page404'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

const server = setupServer(
    rest.get("http://localhost:4000/getTransaction", (req, res, ctx) => {
        return res.json(
            [
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
            ]
        )
    })
)

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Should return month 1 row of data', async () => {
    server.use(
      rest.get('http://localhost/getTransaction', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(
            [
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
            ]
        )),
      ),
    )
    render(<TableData/>)
    const object = await screen.findByText(/300/i, /200/i)
    expect(object).toBeInTheDocument()
})

test('Should return month 2 row of data', async () => {
    server.use(
      rest.get('http://localhost/getTransaction', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(
            [
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
            ]
        )),
      ),
    )
    render(<TableData/>)
    const object = await screen.findByText(/340/i, /0/i, /150/i)
    expect(object).toBeInTheDocument()
})

test('Should return month 3 row of data', async () => {
    server.use(
      rest.get('http://localhost/getTransaction', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(
            [
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
            ]
        )),
      ),
    )
    render(<TableData/>)
    const object = await screen.findByText(/400/i, /280/i, /90/i)
    expect(object).toBeInTheDocument()
})

test('Should return grand total of points', async () => {
    server.use(
      rest.get('http://localhost/getTransaction', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(
            [
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
            ]
        )),
      ),
    )
    render(<TableData/>)
    const object = await screen.findByText(/2530 Points/i)
    expect(object).toBeInTheDocument()
})

test('Should render Table component', async () => {
    render(<TableData/>)
    const taskElement = screen.getByTestId('table')
    expect(taskElement).toBeInTheDocument()
})

test('Should render 404 page component', async () => {
    render(
        <Router>
            <Page404/>
        </Router>
    )
    const Element404 = screen.getByTestId('404')
    expect(Element404).toBeInTheDocument()
})

test('Check table render', async () => {
    render(<TableData/>)
    const tableElement = screen.getByTestId('table')
    await waitFor(() => expect(tableElement).toBeInTheDocument()) 
})





