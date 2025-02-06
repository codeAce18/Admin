import React, { useState } from 'react';

const Search = ({ props }) => {
    const { search, setSearch, handleSearchClick } = props;

    // Handle input change
    const handleInputChange = (e) => {

        setSearch(e.target.value);       // Update parent search state
    };


    return (
        <div className="row">
            <div className="col-xl-12 ">
                <div className="card custom-card m-bg-secondary ">
                    <div className="card-body p-0">
                        <div className="input-group p-3 pb-2">
                            <input
                                type="text"
                                className="form-control form-control-lg m-bg-secondary"
                                value={search}
                                onChange={handleInputChange}
                                placeholder="Search Here ..."
                                aria-label="Search Here ..."
                                aria-describedby="button-addon1"
                            />
                            <button
                                className="btn btn-primary btn-wave"
                                type="button"
                                id="button-addon1"
                                onClick={handleSearchClick} // Optional search on button click
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
