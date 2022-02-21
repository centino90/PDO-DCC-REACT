import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
    Outlet
} from 'react-router-dom'
import { About } from './About'
import { Home } from './home'
import { Topics } from './Topics'
import { Col, Row, Table } from 'react-bootstrap'
import ReactDatatable from '@ashvin27/react-datatable'

function Topic() {
    let { topicId } = useParams()

    return (
        <div>
            {topicId}
        </div>
    )
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total_pages: 0,
            records: []
        }
        this.columns = [
            {
                key: "name",
                text: "Name",
                className: "name",
                sortable: true
            },
            {
                key: "address",
                text: "Address",
                sortable: true
            },
            {
                key: "postcode",
                text: "Postcode",
                className: "postcode",
                sortable: true
            },
            {
                key: "rating",
                text: "Rating",
                className: "rating",
                sortable: true
            },
            {
                key: "type_of_food",
                text: "Type of Food",
                className: "type_of_food",
                sortable: true
            }
        ]
        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: true,
            show_pagination: true,
            button: {
                excel: false,
                print: false
            }
        }
    }

    componentDidMount() {
        this.getData()
    }
    componentDidUpdate() {
        console.log('updated')
    }

    getData = (queryString = "") => {
        console.log(queryString)
        const PATH = 'http://localhost/DuesPaymentSystem/users/login'
        const f = fetch(PATH)
       f.then(data => data.json()).then(console.log)
        const myPromise = new Promise((resolve, reject) => {
            const data = {
                count: 20,
                currentPage: 1,
                rows: [
                    {
                        id: 1,
                        'name': 'helloworld1',
                        'address': 'helloworld1',
                        'postcode': 'helloworld1',
                        'rating': 'helloworld1',
                        'type_of_food': 'helloworld1'
                    },
                    {
                        id: 2,
                        'name': 'helloworld2',
                        'address': 'helloworld2',
                        'postcode': 'helloworld2',
                        'rating': 'helloworld2',
                        'type_of_food': 'helloworld2'
                    },
                    {
                        id: 3,
                        'name': 'helloworld3',
                        'address': 'helloworld3',
                        'postcode': 'helloworld3',
                        'rating': 'helloworld3',
                        'type_of_food': 'helloworld3'
                    },
                    {
                        id: 4,
                        'name': 'helloworld4',
                        'address': 'helloworld4',
                        'postcode': 'helloworld4',
                        'rating': 'helloworld4',
                        'type_of_food': 'helloworld4'
                    },
                    {
                        id: 5,
                        'name': 'helloworld5',
                        'address': 'helloworld5',
                        'postcode': 'helloworld5',
                        'rating': 'helloworld5',
                        'type_of_food': 'helloworld5'
                    },
                    {
                        id: 6,
                        'name': 'helloworld6',
                        'address': 'helloworld6',
                        'postcode': 'helloworld6',
                        'rating': 'helloworld6',
                        'type_of_food': 'helloworld6'
                    },
                    {
                        id: 7,
                        'name': 'helloworld7',
                        'address': 'helloworld7',
                        'postcode': 'helloworld7',
                        'rating': 'helloworld7',
                        'type_of_food': 'helloworld7'
                    },
                    {
                        id: 8,
                        'name': 'helloworld8',
                        'address': 'helloworld8',
                        'postcode': 'helloworld8',
                        'rating': 'helloworld8',
                        'type_of_food': 'helloworld8'
                    },
                    {
                        id: 9,
                        'name': 'helloworld9',
                        'address': 'helloworld9',
                        'postcode': 'helloworld9',
                        'rating': 'helloworld9',
                        'type_of_food': 'helloworld9'
                    },
                    {
                        id: 10,
                        'name': 'helloworld10',
                        'address': 'helloworld10',
                        'postcode': 'helloworld10',
                        'rating': 'helloworld10',
                        'type_of_food': 'helloworld10'
                    }
                ]
            }

            setTimeout(() => {
                resolve(data);
            }, 2000);
        })

        myPromise.then(data => data)
            .then((results) => {
                this.setState({
                    total_pages: results.count,
                    records: results.rows               
                })
            })
    }
    tableChangeHandler = data => {
        console.log(data)
        let queryString = Object.keys(data).map((key) => {
            if (key === "sort_order" && data[key]) {
                return encodeURIComponent("sort_order") + '=' + encodeURIComponent(data[key].order) + '&' + encodeURIComponent("sort_column") + '=' + encodeURIComponent(data[key].column)
            } else {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
            }

        }).join('&');

        this.getData(queryString);
    }

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/topics">Topics</Link></li>
                    </ul>

                    <hr />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="topics" element={<Topics />}>
                            <Route
                                index
                                element={
                                    <main style={{ padding: '1rem' }}>
                                        <p>Select a topic</p>
                                    </main>
                                }
                            />
                            <Route path=":topicId" element={<Topic />} />
                        </Route>
                        <Route
                            path="*"
                            element={
                                <main style={{ padding: '1rem' }}>
                                    <p>There's nothing here!</p>
                                </main>
                            }
                        />
                    </Routes>

                    <ReactDatatable
                        config={this.config}
                        records={this.state.records}
                        columns={this.columns}
                        dynamic={true}
                        total_record={this.state.total_pages}
                        onChange={this.tableChangeHandler} />
                </div>
            </Router>
        )
    }
}

export default App