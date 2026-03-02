import React from 'react';
import Navbar from '../component/Navbar/Navbar';
import Banner from '../component/Banner/Banner';
import About from '../component/About/About';
import Skills from '../component/Skills/Skills';
import Projects from '../component/Projects/Projects';
import Contacts from '../component/Contacts/Contacts';

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <About />
            <Skills />
            <Projects />
            <Contacts />
        </div>
    );
};

export default RootLayout;