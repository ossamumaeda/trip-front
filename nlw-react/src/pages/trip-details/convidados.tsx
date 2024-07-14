import { CircleDashed, UserCog, CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface Participants {
    id: string,
    name: string,
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

interface Convidados {
    tripInfo: Trip | undefined
}

export function Convidados({ tripInfo }: Convidados) {

    const [convidados, setConvidados] = useState<Participants[] | undefined>(undefined)

    useEffect(() => {
        setConvidados(tripInfo?.participant)
        console.log(tripInfo?.participant)
    }, [tripInfo])

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
                {convidados?.map((c, i) => {
                    return (
                        <div key={i} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">Gabriel</span>
                                <span className="block text-sm text-zinc-400 truncate">
                                    {c.email}
                                </span>
                            </div>
                            {c.is_confirmed? (<CircleCheck className="text-lime-400 size-5 shrink-0" />) : (<CircleDashed className="text-zinc-400 size-5 shrink-0" />)}
                            
                        </div>
                    )
                })}


            </div>
            <button
                className="bg-zinc-800 w-full justify-center text-zinc-200 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-zinc-700">
                <UserCog className="size-5" />
                Gerenciar convidados
            </button>
        </div>
    )
}

