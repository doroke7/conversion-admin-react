import React, { useContext, useState, useEffect, useLayoutEffect, Component } from 'react';

function A() {
  console.info('A init');
  useEffect(() => {
    console.info('A useEffect');
  }, []);
  return (
    <div>
      <div>A</div>
      <B></B>
    </div>
  );
}

function B() {
  console.info('B init');
  useEffect(() => {
    console.info('B useEffect');
  }, []);
  return (
    <div>
      <div>B</div>
      <C></C>
    </div>
  );
}

function C() {
  console.info('C init');
  useEffect(() => {
    console.info('C useEffect');
  }, []);
  return <div>C</div>;
}

function App() {
  console.info('App init');
  useEffect(() => {
    console.info('App useEffect');
  }, []);
  return (
    <div>
      <A></A>
    </div>
  );
}

export default App;
