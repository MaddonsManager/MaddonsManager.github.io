import { Accordion, AccordionItem, Avatar, Link } from '@nextui-org/react'

function Notes({ appReleaseNotes, webReleaseNotes, selectedNotes }) {
    const releaseNotes = selectedNotes === 'app' ? appReleaseNotes : webReleaseNotes

    return (
        <div className="mb-10 ">
            {releaseNotes.map((releaseNote) => (
                <div
                    key={releaseNote.version}
                    id={`release-note-${releaseNote.version}`}
                    className="relative mt-24 flex flex-col border-t border-dark/30 pt-10 lg:flex-row rounded-md border-small border-primary-200/40 bg-background/10 shadow-medium backdrop-blur-md gap-4 p-4 m-4 text-start"
                >
                    <div className="w-full mr-4">
                        <h1 className="text-3xl font-bold text-default-900">
                            Release notes for {releaseNote.version} 🎉
                        </h1>
                        <span className="text-default-500 text-sm">{releaseNote.date}</span>
                        <div className="mt-2">
                            <Link
                                showAnchorIcon
                                isExternal
                                href={`https://github.com/PentSec/MaddonsManager/releases/tag/${releaseNote.version}`}
                            >
                                Github Release
                            </Link>
                        </div>
                        <p className="mt-8 text-lg text-default-800">
                            If you encounter any issues, please report them on{' '}
                            <Link
                                showAnchorIcon
                                isExternal
                                href="https://github.com/PentSec/MaddonsManager/issues"
                            >
                                the issues page
                            </Link>
                            .
                        </p>

                        {releaseNote.extra ? (
                            <p className="text-md mt-8 text-default-800">{releaseNote.extra}</p>
                        ) : null}
                        <div className="mt-8" data-orientation="vertical"></div>

                        <Accordion selectionMode="multiple" variant="light">
                            {releaseNote.features?.length > 0 && (
                                <AccordionItem
                                    key={`${releaseNote.version}-features`}
                                    aria-label={`Features - ${releaseNote.version}`}
                                    startContent={
                                        <Avatar
                                            showFallback
                                            name="Feacture"
                                            isBordered
                                            color="primary"
                                            radius="md"
                                        />
                                    }
                                    title="Features"
                                >
                                    {releaseNote.features.map((feature, index) => (
                                        <p key={index} className="text-default-500">
                                            - {feature}
                                        </p>
                                    ))}
                                </AccordionItem>
                            )}

                            {releaseNote.fixed?.length > 0 && (
                                <AccordionItem
                                    key={`${releaseNote.version}-fixed`}
                                    aria-label={`Fixes - ${releaseNote.version}`}
                                    startContent={
                                        <Avatar
                                            showFallback
                                            name="Fix"
                                            isBordered
                                            color="warning"
                                            radius="md"
                                        />
                                    }
                                    title="Fixes"
                                >
                                    {releaseNote.fixed.map((fix, index) => (
                                        <p key={index} className="text-default-500">
                                            - {fix}
                                        </p>
                                    ))}
                                </AccordionItem>
                            )}

                            {releaseNote.breakingChanges?.length > 0 && (
                                <AccordionItem
                                    key={`${releaseNote.version}-breaking`}
                                    aria-label={`Breaking Changes - ${releaseNote.version}`}
                                    startContent={
                                        <Avatar
                                            showFallback
                                            name="Breacking"
                                            isBordered
                                            color="danger"
                                            radius="md"
                                        />
                                    }
                                    title="Breaking Changes"
                                >
                                    {releaseNote.breakingChanges.map((change, index) => (
                                        <p key={index} className="text-default-500">
                                            - {change}
                                        </p>
                                    ))}
                                </AccordionItem>
                            )}
                        </Accordion>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Notes
