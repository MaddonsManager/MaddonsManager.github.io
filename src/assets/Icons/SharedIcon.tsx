import { IconSvgProps } from '@/types'
import type { Variants } from 'framer-motion'
import { motion, useAnimation } from 'framer-motion'
import { FC } from 'react'

const pathVariants: Variants = {
    normal: {
        pathLength: 1,
        opacity: 1,
        pathOffset: 0
    },
    animate: {
        opacity: [0, 1],
        pathLength: [0, 1],
        transition: {
            delay: 0.1,
            duration: 0.4,
            opacity: { duration: 0.1, delay: 0.1 }
        }
    }
}

const SharedIcon: FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
    const controls = useAnimation()

    return (
        <div
            className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
            onMouseEnter={() => controls.start('animate')}
            onMouseLeave={() => controls.start('normal')}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height={size || height}
                {...props}
                width={size || width}
                viewBox="0 0 50 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <motion.path
                    variants={pathVariants}
                    initial="normal"
                    animate={controls}
                    fill="currentColor"
                    d="M15 30c-2.8 0-5-2.2-5-5s2.2-5 5-5s5 2.2 5 5s-2.2 5-5 5m0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3m20-2c-2.8 0-5-2.2-5-5s2.2-5 5-5s5 2.2 5 5s-2.2 5-5 5m0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3m0 28c-2.8 0-5-2.2-5-5s2.2-5 5-5s5 2.2 5 5s-2.2 5-5 5m0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3"
                />
                <path
                    fill="currentColor"
                    d="m19.007 25.885l12.88 6.44l-.895 1.788l-12.88-6.44zm11.986-10l.894 1.79l-12.88 6.438l-.894-1.79z"
                ></path>
            </svg>
        </div>
    )
}

export { SharedIcon }
