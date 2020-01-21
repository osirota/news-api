
import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import './App.css';
import NewsService from './../../api';

class App extends Component {
    constructor(props) {
        super(props);
        this.api = new NewsService();

        this.state = {
            newsData: null,
            newsSize: 5,
        }
    }
    componentDidMount() {
        const { newsSize } = this.state;

        this.api.getLastesNews(newsSize).then(({articles}) => this.setState({ newsData: articles }));
    }
    showMore = () => {
        const { newsSize } = this.state;
        const changedSize = newsSize + 5;
        this.api.getLastesNews(changedSize)
            .then(({articles}) => this.setState({ 
                newsData: articles,
                newsSize: changedSize
            }))
    }

    render() {
        const { newsData } = this.state;
        return (
            <div>
                <GridList cellHeight={180}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">News</ListSubheader>
                    </GridListTile>
                    {newsData && newsData.map(tile => (
                    <GridListTile key={tile.urlToImage}>
                        <img src={tile.urlToImage} alt={tile.title} />
                        <GridListTileBar
                        title={tile.title}
                        subtitle={<span>by: {tile.author}</span>}
                        />
                    </GridListTile>
                    ))}
                </GridList>
                <Button variant="contained" color="primary" onClick={this.showMore}>Show more</Button>
            </div>
        );
    }
}

export default App;