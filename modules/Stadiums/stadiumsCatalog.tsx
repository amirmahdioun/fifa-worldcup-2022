import ImageListComponent from "./components/imageList";
import {StadiumImageDataI} from "../../interfaces/stadiumImageData";

type Props = {
    imageList: StadiumImageDataI[]
}

const StadiumsCatalog = ({imageList}:Props) => {
    return (
        <div>
            <ImageListComponent imageList={imageList} />
        </div>
    );
};

export default StadiumsCatalog;