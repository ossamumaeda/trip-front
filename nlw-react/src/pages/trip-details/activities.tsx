import { CircleCheck, Plus } from "lucide-react";
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
interface Activities {
    openCreateActivityModal: () => void
}

interface Activity {
    date: string,
    activities: {
        id: string,
        title: string,
        occurs_at: string
    }[]
}

// get dia da semana format(a.date,'EEEE',{locale:ptBR})
// get horario format(a.occurs_at,'HH:mm')
export function Activities({
    openCreateActivityModal
}: Activities) {
    const { trip_id } = useParams();
    const [activities, setActivities] = useState<Activity[]>()
    useEffect(() => {
        api.get(`/trips/${trip_id}/activities`).then((r) => {
            setActivities(r.data); //Retorna uma lista de atividades -> [{date,activities: [{},{}] }]
        })
    }, [])

    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold">Atividades</h2>
                <button
                    onClick={openCreateActivityModal}
                    className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-500">
                    Cadastrar atividade
                    <Plus className="size-5" />
                </button>
            </div>



            <div className="space-y-8 ">
                {activities?.map((a, i) => {
                    return (
                        <div key={i} className="space-y-2.5">
                            <div className="flex gap-2 items-baseline">
                                <span className="text-xl text-zin-300">Dia {format(a.date, 'd')}</span>
                                <span className="text-xs text-zin-500">{format(a.date, 'EEEE', { locale: ptBR })}</span>
                            </div>
                            {a.activities.length > 0 ? a.activities?.map((ac, y) => {
                                return (
                                    <div key={y} className="space-y-2.5 ">
                                        <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex item-center gap-3">
                                            <CircleCheck className="size-5 text-lime-300" />
                                            <span className="text-zinc-100"> {ac.title}</span>
                                            <span className="text-zinc-400 text-sm ml-auto">{format(ac.occurs_at, 'HH:mm')}</span>
                                        </div>
                                    </div>
                                )
                            }
                            ) : <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data</p>}
                        </div>
                    )
                })}
                
            </div>
        </div>
    )
}