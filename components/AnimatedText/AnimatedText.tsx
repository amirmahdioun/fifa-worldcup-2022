import React from 'react'
import {motion} from 'framer-motion'
import {Typography} from "@mui/material";

type Props = {
    children: string | React.ReactNode,
    initial: any,
    variants: any,
    animate: any
}

export function SplitText({children, ...rest}: Props): JSX.Element {
    if (children && typeof children === 'string') {
        let words = children.split(' ')
        return (
            <>
                {
                    words.map((word, i) => {
                        return (
                            <div
                                key={children + i}
                                style={{display: 'inline-block', overflow: 'hidden'}}
                            >
                                <motion.div
                                    {...rest}
                                    style={{display: 'inline-block', willChange: 'transform'}}
                                    custom={i}
                                >
                                    <Typography variant={'h2'} fontFamily={'QatarWorldCup'}>
                                        {word + (i !== words.length - 1 ? '\u00A0' : '')}
                                    </Typography>
                                </motion.div>
                            </div>
                        )
                    })
                }
            </>
        )
    } else {
        return <></>;
    }
}