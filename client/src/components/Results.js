import React from 'react';
import { connect } from 'react-redux';
import { saveQuery } from '../redux/actions/searchEngineActions';

class Results extends React.Component {
    state = { loading: true };

    componentDidMount() {
        document.getElementById("overlay").addEventListener('click', () => {
            document.getElementById("overlay").style.display = "none";
            this.props.saveQuery('');
        });
    }

    static getDerivedStateFromProps(props) {
        if (props.result) return { loading: false }; 
        return null;
    }

    render () {
        const { result, query } = this.props; 
        const { loading } = this.state;

        return (
            <div id="overlay">
                <div className="results">
                    <p>{`Search results for ${query}:`}</p>
                    {loading
                        ? <p className="loading">Loading result...</p> 
                        : <p>{result}</p>
                    }
                </div>
            </div>
        )
    }
}
    
function mapStateToProps({ searchEngine }) {
    return {
        query: searchEngine.query,
        val1: searchEngine.val1,
        val2: searchEngine.val2,
        val3: searchEngine.val3,
        val4: searchEngine.val4,
        val5: searchEngine.val5,
        result: searchEngine.result,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveQuery: (query) => {
          dispatch(saveQuery(query))
        }
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Results);