import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { normal } from '@/utils/primitives'

const Countdown = () => {
    const calculateTimeLeft = () => {
        const now = new Date()
        const nextYear = now.getFullYear() + 1
        const newYear = new Date(`January 1, ${nextYear} 00:00:00`)
        const difference = newYear - now

        if (difference <= 0) {
            return null
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        }
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
    const [isNewYear, setIsNewYear] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft()
            setTimeLeft(newTimeLeft)

            if (!newTimeLeft) {
                setIsNewYear(true)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (isNewYear) {
            const confettiInterval = setInterval(() => {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { x: Math.random(), y: Math.random() - 0.2 }
                })
            }, 1000)

            return () => clearInterval(confettiInterval)
        }
    }, [isNewYear])

    if (isNewYear) {
        return (
            <div className="lg:fixed left-4 top-40 z-50 animate-hueRotate ">
                <div className="gap-2 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md border-small border-primary-200/40 bg-background/60 shadow-medium backdrop-blur-md mb-2">
                    <h1 className={normal({ color: 'pink', size: 'md' })}>¡Happy New Year!</h1>
                    <span className="text-2xl">🎉🎆</span>
                    <p className="text-lg">
                        {' '}
                        It's time to celebrate the new year with a little celebration of life. 🎉
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="lg:fixed left-4 top-40 z-50 animate-hueRotate">
            <div className="gap-2 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md border-small border-primary-200/40 bg-background/60 shadow-medium backdrop-blur-md mb-2">
                <h1 className={normal({ color: 'pink', size: 'md' })}>
                    <span className="mr-2">New Year Maddons Countdown</span>
                </h1>
                <span className="text-2xl">🎉🎆</span>
                <div className="flex gap-4 mt-4 text-lg items-center justify-center">
                    {timeLeft && (
                        <>
                            <div>
                                <p className={normal({ color: 'pink', size: 'md' })}>
                                    {timeLeft.days} :
                                </p>
                                <p>Days</p>
                            </div>
                            <div>
                                <p className={normal({ color: 'pink', size: 'md' })}>
                                    {timeLeft.hours} :
                                </p>
                                <p>Hours</p>
                            </div>
                            <div>
                                <p className={normal({ color: 'pink', size: 'md' })}>
                                    {timeLeft.minutes} :
                                </p>
                                <p>Min</p>
                            </div>
                            <div>
                                <p className={normal({ color: 'pink', size: 'md' })}>
                                    {timeLeft.seconds}
                                </p>
                                <p>Seg</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Countdown
