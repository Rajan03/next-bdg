'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string; // For Styling Panel only
    children: React.ReactNode;
}

export function AppModal({
                             isOpen,
                             onClose,
                             children,
                             className,
                         }: IModalProps) {
    const panelCls =
        twMerge(`w-full max-w-md transform overflow-hidden rounded-2xl 
    bg-white p-6 text-left align-middle shadow-xl transition-all duration-300 ease-in-out ${className}`);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog onClose={onClose}>
                    {/* OVERLAY */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25 z-[80]" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto z-[90]">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className={panelCls}>{children}</Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
