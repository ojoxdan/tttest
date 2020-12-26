import React from 'react'
import {BrowserRouter as Router, Links, Switch,Route} from 'react-router-dom'
import RegularPostPage  from "./RegularPostPage"
import JobsPostPage from './JobsPostPage'
import Home from '../../home/Home'
import BuynowPostPage from './BuynowPostPage'

const PostPage = () => {
    return (
        <Router>
            <Switch>
                <Route exact component={Home} path="/posts"/>
                <Route exact path="/posts/regular/:category/:posturl*" component={RegularPostPage}/>
                <Route exact path="/posts/jobs/:category/:posturl" component={JobsPostPage}/>
                <Route exact path="/posts/buynow/:category/:posturl" component={BuynowPostPage}/>
            </Switch>
        </Router>
    )
}

export default PostPage
