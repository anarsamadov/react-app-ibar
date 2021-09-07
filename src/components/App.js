import React, { Component,Fragment } from 'react'
import Header from './Header'
import Table from './Table'

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <Table/>
            </Fragment>
        )
    }
}

export default App;