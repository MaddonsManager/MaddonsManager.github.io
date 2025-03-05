import { IconSvgProps } from '@/types'
import type { Transition } from 'framer-motion'
import { motion, useAnimation } from 'framer-motion'
import { FC } from 'react'

const defaultTransition: Transition = {
    times: [0, 0.4, 1],
    duration: 0.5
}

const CircleChevronDownIcon: FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
    const controls = useAnimation()

    return (
        <div
            className="cursor-pointer select-none hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
            onMouseEnter={() => controls.start('animate')}
            onMouseLeave={() => controls.start('normal')}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size || width}
                height={size || height}
                {...props}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <motion.path
                    variants={{
                        normal: { y: 0 },
                        animate: {
                            y: [0, 2, 0]
                        }
                    }}
                    transition={defaultTransition}
                    animate={controls}
                    d="m16 10-4 4-4-4"
                />
            </svg>
        </div>
    )
}

export { CircleChevronDownIcon }
