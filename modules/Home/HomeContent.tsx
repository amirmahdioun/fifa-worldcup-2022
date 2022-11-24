import Hero from "./components/Hero/Hero";
import StadiumsCatalog from "../Stadiums/stadiumsCatalog";
import {stadiumImageData} from "../../data/stadiums/stadiumImage";



const HomeContent = () => {
    return (
        <div>
            <Hero  heroImageSrc={'/assets/images/header-background.jpg'}/>
            <StadiumsCatalog imageList={stadiumImageData} />
        </div>
    );
};

export default HomeContent;