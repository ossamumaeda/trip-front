import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"
import { format } from "date-fns"
interface DestinationAndDateStep {
    isGuestsInputOpen: boolean
    closeGuestInput: () => void
    openGuestInput: () => void
    setDestination: (destination: string) => void
    setEventDate: (dates: DateRange | undefined) => void
    eventDate: DateRange | undefined
}

export function DestinationAndDateStep({
    closeGuestInput,
    isGuestsInputOpen,
    openGuestInput,
    setDestination,
    setEventDate,
    eventDate
}: DestinationAndDateStep) {

    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);


    function CloseIsOpenDatePicker() {
        setIsOpenDatePicker(false);
    }

    function OpenIsOpenDatePicker() {
        setIsOpenDatePicker(true);
    }

    const displayedDate = eventDate && eventDate.from && eventDate.to ?
        format(eventDate.from, "d' de 'LLL").concat(' até ').concat(format(eventDate.to, "d' de 'LLL"))
        : null;

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape  gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input
                    onChange={event => setDestination(event?.target.value)}
                    type="text"
                    placeholder="Para onde você vai?"
                    disabled={isGuestsInputOpen}
                    className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                />
            </div>
            <button
                onClick={OpenIsOpenDatePicker}
                className="flex items-center gap-2 text-left w-[240px]">
                <Calendar className="size-5 text-zinc-400" />
                <span className="text-lg text-zinc-400 w-40 flex-1">
                    {displayedDate || "Quando?"}
                </span>
            </button>

            {isOpenDatePicker && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className=" rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Seleciona a data</h2>
                                <button onClick={CloseIsOpenDatePicker}>

                                    <X className="size-5 text-zinc-400" />
                                </button>
                            </div>
                        </div>
                        <DayPicker mode="range" selected={eventDate} onSelect={setEventDate} />
                    </div>
                </div>
            )}

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestsInputOpen ? (
                <button
                    onClick={closeGuestInput}
                    className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
                    Alterar local/data
                    <Settings2 className="size-5" />
                </button>
            ) : (
                <button
                    onClick={openGuestInput}
                    className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-500">
                    Continuar
                    <ArrowRight className="size-5" />
                </button>
            )}
        </div>
    );
}