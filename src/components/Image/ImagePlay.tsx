import { useState } from "react"
import { Image } from "../../types/Image"
import {
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons';


const styles = {
    container: {
        display: 'inline-flex',
        FlexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    image: {
        width: '80%',
    },
    icon: {
        fontSize: '2rem',
        margin: '1rem',
    }
}

export function ImagePlayer({
    images,
    currentImageIndex,
}:{
    images: Image[]
    currentImageIndex: number
}) {
    const [index, setIndex] = useState(currentImageIndex);

    const playPrevious = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
        else {
            setIndex(images.length - 1);
        }
    };

    const playNext = () => {
        if (index < images.length - 1) {
            setIndex(index + 1);
        }
        else {
            setIndex(0);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.icon} onClick={playPrevious}><LeftOutlined /></div>
            <img src={images[index].cover} alt={images[index].name} style={styles.image}/>
            <div style={styles.icon} onClick={playNext}><RightOutlined /></div>
        </div>
    )
}