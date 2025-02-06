import React from 'react'

const Footer = () => {
    const addjquery=()=>{
        var script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    const addbootstarp = ()=>{
        var script = document.createElement('script');
        script.src = '../assets/libs/bootstrap/js/bootstrap.bundle.min.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    
return (
    <div></div>
)
}

export default Footer