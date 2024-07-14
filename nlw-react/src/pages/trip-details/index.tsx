import { Calendar, Plus, Tag, X } from "lucide-react"
import { useEffect, useState } from "react";
import { ImportantLinks } from "./important-links";
import { Convidados } from "./convidados";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participants {
    id: string,
    name: string ,
    email: string,
    is_confirmed: boolean,
    is_owner: boolean,
    trip_id: string
}
interface Trip {
    id: string,
    destination: string,
    starts_at: string,
    ends_at: string,
    is_confirmed: boolean,
    participant: Participants[] | undefined
}

export function TripDetailsPage() {
    const { trip_id } = useParams();

    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
    const [tripInfo, setTripInfo] = useState<Trip | undefined>()
    function openCreateActivityModal() {
        setIsCreateActivityModalOpen(true);
    }
    function closeCreateActivityModal() {
        setIsCreateActivityModalOpen(false);
    }

    useEffect(() => {
        api.get(`/trip/${trip_id}`).then((r) => {
            setTripInfo(r.data.trip)
        })
    }, [trip_id])

    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8 ">
            <DestinationAndDateHeader tripInfo={tripInfo} />
            <main className="flex gap-16 px-4">
                <Activities openCreateActivityModal={openCreateActivityModal} />

                <div className="w-80 space-y-6">
                    <ImportantLinks />
                    <Convidados tripInfo={tripInfo}/>
                </div>
            </main>

            {
                isCreateActivityModalOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Cadastrar nova atividade</h2>
                                    <button onClick={closeCreateActivityModal}>
                                        <X className="size-5 text-zinc-400" />
                                    </button>
                                </div>
                                <p className="text-sm text-zinc-400">
                                    Todos os convidados podem visualizar as atividades
                                </p>
                            </div>

                            <form onSubmit={() => { }} className="space-y-3">
                                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                                    <Tag className="text-zinc-400 size-5" />
                                    <input
                                        type="text"
                                        name="atividade"
                                        placeholder="Qual a atividade?"
                                        className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 flex-1">
                                        <Calendar className="text-zinc-400 size-5" />
                                        <input
                                            type="datetime-local"
                                            name="occurs_at"
                                            placeholder="Data e horário da atividade"
                                            className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                                        />
                                    </div>
                                </div>

                                <Button size="full" type="submit">
                                    Salvar atividade
                                    <Plus className="size-5" />
                                </Button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
