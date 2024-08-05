import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import * as MicroStacks from '@micro-stacks/react';
import { SellPageContents } from './components/sell-page.jsx';
import { NavBar } from './components/navbar.jsx';


export default function SellPage() {
  return (
    <MicroStacks.ClientProvider
      appName={'React + micro-stacks'}
      appIconUrl={reactLogo}
    >
        <NavBar />
        <SellPageContents />
    </MicroStacks.ClientProvider>
  );
}