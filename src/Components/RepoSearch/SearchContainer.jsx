import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import SearchResult from './SearchResult';
import SearchForm from './SearchForm';

import useFetchRepos from '../../Hooks/useFetchRepos';

const SearchContainer = () => {
    const [params, setParams] = useState({});
    const [page, setPage] = useState(1);

    const { repos, loading, error } = useFetchRepos(params, page);

    const totalPages = Math.floor(repos.total_count / 10);
    const visibility = repos.length <= 0 ? 'hidden' : 'visible';

    useEffect(() => {
        setPage(1);
    }, [params])

    const debounce = (fn, wait) => {
        let timeout;
        return (...args) => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                fn.apply(this, args);
            }, wait);
        };
    }

    const handleParamChange = (e) => {
        const param = e.target.name;
        const value = param === 'sort' ? e.target.checked && 'stars' : e.target.value;
        
        setPage(1);
        setParams(prevParams => ({ ...prevParams, [param]: value }));      
    }

    const debounceOnChange = useCallback(debounce(handleParamChange, 1000), []);

    const Display = () => {
        if(error) return <h1>{error.message}</h1>
        else if(loading) return <h1>Loading...</h1>
        return (
            <h1>
                {repos?.items?.map((repo) => {
                    return <SearchResult key={repo.id} repo={repo} />
                })}
            </h1>
        )
    }
    
    return (
        <Container className="my-4">
            <h1 className="mb-4">GitHub Repositories</h1>
            <SearchForm params={params} onParamChange={debounceOnChange} />
            <div style={{visibility: visibility}} id="react-paginate">
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={totalPages < 100 ? totalPages : 100}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={5}
                    onPageChange={({ selected }) => {
                        setPage(selected + 1);
                    }}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    forcePage={page - 1}
                />
            </div>
            <Display />
        </Container>
    );
}

export default SearchContainer;
