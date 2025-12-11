import Hero from '../components/sections/Hero';
import HomeServices from '../components/sections/HomeServices';
import DestinationsCarousel from '../components/sections/DestinationsCarousel';
import AboutUs from '../components/sections/AboutUs';
import PassportCheck from '../components/sections/PassportCheck';

const Home = () => {
    return (
        <main>
            <Hero />
            <PassportCheck />
            <HomeServices />
            <DestinationsCarousel />
            <AboutUs />
        </main>
    );
};

export default Home;
