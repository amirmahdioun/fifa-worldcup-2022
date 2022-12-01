import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {StadiumImageDataI} from "../../../interfaces/stadiumImageData";
import {ImageListItemBar, useMediaQuery, useTheme} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import Link from "next/link";


type Props = {
    imageList: StadiumImageDataI[]
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function ImageListComponent({imageList}: Props) {
    const theme = useTheme()
    const medium = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <ImageList
            variant="quilted"
            cols={medium ? 4 : 1}
            rowHeight={160}
            sx={{margin: '0', backgroundColor: theme.palette.primary.main}}
        >
            {imageList.map((item) => (
                <ImageListItem key={item.url}
                               cols={(medium && item.cols) ? item.cols : 1}
                               rows={item.rows || 1}
                >

                    <img
                        {...srcset(item.url, 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                    />
                    <Link href={`/stadiums/${item.id}`}>
                        <ImageListItemBar
                            style={{backgroundColor:  'rgb(154 17 50 / 60%)'}}
                            title={item.title}
                            subtitle={'more info'}
                            actionIcon={<InfoIcon sx={{color: 'white'}} />}
                        />
                    </Link>
                </ImageListItem>

            ))}
        </ImageList>
    );
}
