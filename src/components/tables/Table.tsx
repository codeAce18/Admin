import React, { useEffect, useState } from 'react'

import Coin from '../../assets/images/pirate/standingdollarcoin.svg'
import { Link } from 'react-router-dom';

const Table = ({ props }) => {
    const { title, columns, data, actions } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        console.log("table data: ",data)
    },[])

    // Handle search filtering
    useEffect(() => {
        if (searchTerm) {
            const filtered = data.filter((row) =>
                columns.some((col) =>
                    String(row[col.name]).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    }, [searchTerm, data, columns]);

    // Handle pagination
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentData = filteredData && Array.isArray(filteredData) ? filteredData.slice(firstIndex, lastIndex) : [];

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const onExportCSV = () => {
        // Define the CSV content
        const csvHeaders = columns.map((col) => col.label).join(','); // Create the header row
        const csvRows = filteredData.map((row) =>
            columns.map((col) => `"${row[col.name]}"`).join(',')
        ); // Create each row of data

        // Combine headers and rows into a single CSV string
        const csvContent = [csvHeaders, ...csvRows].join('\n');

        // Create a Blob from the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Create a link and trigger a download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${title}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="row">
            <div className="col-xxl-9">
                <div className="card custom-card m-bg-secondary">
                    <div className="card-header justify-content-between">
                        <div className="card-title">{title}</div>
                        <div className="d-flex flex-wrap gap-2">
                            <div>
                                <input
                                    className="form-control form-control-sm m-bg-secondary"
                                    type="text"
                                    placeholder="Search Here"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="btn btn-success btn-sm px-3 btn-wave" onClick={() => onExportCSV()}>
                                Export
                                <i className="ri-export-fill fs-6 ms-1"></i>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table text-nowrap">
                                <thead>
                                    <tr>
                                        {columns.map((col) => (
                                            <th key={col.name}>{col.label}</th>
                                        ))}
                                        {actions && <th>Actions</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((row, index) => (
                                        <tr key={index}>
                                            {columns.map((col) => (
                                                <td key={col.name}>
                                                    {col.type === 'image' ? (
                                                        <img src={row[col.name] ? `${process.env.REACT_APP_API_URL}${row[col.name]}` : Coin} alt={col.label} style={{ width: '70px' }} className='rounded' />
                                                    ) : col.type === 'price' ? (
                                                        <div>
                                                            <img src={Coin} alt="img" className='rounded-3 m-1' width={20} />
                                                            {`${parseFloat(row[col.name]).toFixed(0)}`}
                                                        </div>
                                                    ) : col.type === 'url' ? (
                                                        <Link to={row[col.name]} ><span className='ri-link-m fs-4 text-info'></span></Link>
                                                    ) : col.type === 'status' ? (<td><span className={row[col.name] === 'Blocked' ? 'badge bg-outline-danger' : "badge bg-outline-success"}>{row[col.name]}</span></td>)
                                                        : (
                                                            row[col.name]
                                                        )}
                                                </td>
                                            ))}
                                            {actions && (
                                                <td>
                                                    <div className="btn-list">
                                                        {actions.map((action) => (
                                                            <button
                                                                key={action.name}
                                                                className={`btn btn-sm btn-icon btn-${action.class}`}
                                                                onClick={() => action.callback(row)}
                                                                title={action.name}
                                                            >
                                                                <i className={action.icon}></i>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex align-items-center">
                            <div>Showing {itemsPerPage} Entries</div>
                            <div className="ms-auto text-secondary">
                                <nav aria-label="Page navigation" className="pagination-style-4">
                                    <ul className="pagination mb-0">
                                        <li className="page-item">
                                            <button
                                                className="page-link"
                                                disabled={currentPage === 1}
                                                onClick={() => handlePageChange(currentPage - 1)}
                                            >
                                                Prev
                                            </button>
                                        </li>
                                        {
                                            (filteredData && filteredData.length > 0) &&
                                            [...Array(Math.ceil(filteredData.length / itemsPerPage))].map((_, idx) => (
                                                <li key={idx} className={`page-item ${idx + 1 === currentPage ? 'active' : ''}`}>
                                                    <button className="page-link" onClick={() => handlePageChange(idx + 1)}>
                                                        {idx + 1}
                                                    </button>
                                                </li>
                                            ))}
                                        <li className="page-item">
                                            <button
                                                className="page-link"
                                                disabled={currentPage === Math.ceil(filteredData ? filteredData.length / itemsPerPage : 1)}
                                                onClick={() => handlePageChange(currentPage + 1)}
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};



export default Table