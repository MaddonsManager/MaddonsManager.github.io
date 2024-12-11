import React, { useState } from 'react'
import useAddonsData from '@/hook/useAddonsData'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Image,
    Chip,
    Divider,
    Link,
    Tooltip
} from '@nextui-org/react'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { motion, AnimatePresence } from 'framer-motion'
import { DeleteIcon, DownloadIcon } from '@/utils/icons'
import SelectType from './SelectType'

const Addon = () => {
    const [version, setVersion] = useState('lich')
    const { data, isLoading, error } = useAddonsData(version)

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState('')

    const addonTypes =
        data && data.length > 0 ? Array.from(new Set(data.map((addon) => addon.addonType))) : []

    const filteredData = data
        ? data.filter(
              (addon) =>
                  addon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (!selectedType || addon.addonType === selectedType)
          )
        : []

    const handleDownload = async (githubRepo) => {
        const mainUrl = `${githubRepo}/archive/refs/heads/main.zip`
        const masterUrl = `${githubRepo}/archive/refs/heads/master.zip`
        window.open(mainUrl)
    }

    const MotionCard = motion.create(Card)

    const cardVariants = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div>
            <h1>World of Warcraft Addons</h1>

            <div>
                <label>Selecciona una versión:</label>
                <select value={version} onChange={(e) => setVersion(e.target.value)}>
                    <option value="lich">Lich King</option>
                    <option value="cata">Cataclysm</option>
                    <option value="panta">Pandaria</option>
                </select>
            </div>

            <div>
                <label>Buscar por nombre:</label>
                <input
                    type="text"
                    placeholder="Buscar addon"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <SelectType
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                addonTypes={addonTypes}
            />

            <div className="h-[calc(95vh-32px)]">
                <div className="container h-full p-1 mx-auto mb-4">
                    <ScrollShadow hideScrollBar className="h-[calc(93vh-32px)] overflow-auto mb-4">
                        {isLoading && <p>Cargando datos...</p>}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        {filteredData.length > 0 ? (
                            <div className="flex flex-wrap gap-4 content-center items-center justify-center">
                                {filteredData.map((addon, index) => (
                                    <AnimatePresence>
                                        <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                                            <MotionCard
                                                isPressable={true}
                                                // onPress={openModal}
                                                isFooterBlurred
                                                variants={cardVariants}
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ duration: 0.2, delay: index * 0.1 }}
                                                fallback
                                                shadow="sm"
                                                className="w-[200px] h-[200px]"
                                            >
                                                <CardBody className="p-0 overflow-visible">
                                                    <Image
                                                        removeWrapper
                                                        alt={addon.name}
                                                        radius="sm"
                                                        src={addon.imageUrl}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </CardBody>
                                                <CardFooter className="absolute bottom-0 z-10 flex items-center justify-between bg-black/70 border-t-1 border-default-600 dark:border-default-100">
                                                    <div className="flex flex-col items-start flex-grow gap-1">
                                                        <p className="font-bold md:text-sm xl:text-md">
                                                            {addon.name}
                                                        </p>
                                                        <p className="text-tiny text-white/60">
                                                            {addon.addonType}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-end justify-end flex-grow gap-2">
                                                        <Tooltip
                                                            content="Download it"
                                                            color="primary"
                                                        >
                                                            <Button
                                                                isIconOnly
                                                                color="primary"
                                                                radius="full"
                                                                size="sm"
                                                                variant="shadow"
                                                                onPress={() =>
                                                                    handleDownload(addon.githubRepo)
                                                                }
                                                            >
                                                                <DownloadIcon />
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </CardFooter>
                                            </MotionCard>
                                        </div>
                                    </AnimatePresence>
                                ))}
                            </div>
                        ) : (
                            <p>No se encontraron addons que coincidan con los filtros.</p>
                        )}
                    </ScrollShadow>
                </div>
            </div>
        </div>
    )
}

export default Addon
