import "./App.css";
import { useState, useEffect } from "react";
import Pagination from "./component/Pagination";
import Postlist from "./component/Postlist";
import SearchTerm from "./component/SearchTerm";
import queryString from "query-string";

function App() {
  const [postlist, setpostlist] = useState({
    postlistiteams: [],
    active: null,
  });
  const [pagination, setpagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });
  const [filter, setfilter] = useState({
    _page: 1,
    _limit: 10,
  });

  useEffect(() => {
    try {
      async function fetchPostList() {
        const paramString = queryString.stringify(filter);
        const requestURL = `https://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestURL);
        const responseJSON = await response.json();
        console.log({ responseJSON });
        const { data, pagination } = responseJSON;
        setpostlist({
          ...postlist,
          postlistiteams: data,
        });
        setpagination(pagination);
      }
      fetchPostList();
    } catch (error) {}
  }, [filter]);

  function handlePageChange(newPage) {
    console.log("new page ", newPage);
    setfilter({
      ...filter,
      _page: newPage,
    });
  }

  function handleFilterChange(newFilter) {
    setfilter({
      ...filter,
      _page: 1,
      title_like: newFilter.searchTerm,
    });
  }

  function handleonClick(post) {
    console.log(post);
    setpostlist(() => ({
      ...postlist,
      active: post.id,
    }));
  }

  return (
    <div className="App">
      <h1>Post_list</h1>
      <SearchTerm onSubmit={handleFilterChange} />
      <Postlist posts={postlist} onClick={handleonClick} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
