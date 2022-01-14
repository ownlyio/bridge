import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import $ from "jquery";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

$(document).scroll("body", function() {
    if($(window).width() >= 768) {
        $("#header").removeClass("scrolled");
        $("#mobile-scroll-up").addClass("d-none");
    } else {
        if($(window).scrollTop()) {
            $("#header").addClass("scrolled");
        } else {
            // $("#header").removeClass("scrolled");
            $("#header").addClass("scrolled");
        }

        if($(window).scrollTop() >= $(window).height()) {
            $("#mobile-scroll-up").removeClass("d-none");
        } else {
            $("#mobile-scroll-up").addClass("d-none");
        }
    }
});