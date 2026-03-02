import React from 'react';
import Navbar from '../component/Navbar/Navbar';
import Banner from '../component/Banner/Banner';
import About from '../component/About/About';
import Skills from '../component/Skills/Skills';
import Projects from '../component/Projects/Projects';
import Contacts from '../component/Contacts/Contacts';
import Education from '../component/Education/Education';

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Contacts />
        </div>
    );
};

export default RootLayout;