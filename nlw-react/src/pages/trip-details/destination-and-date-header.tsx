import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";

interface Trip{
    id:string,
    destination:string,
    starts_at:string,
    ends_at:string,
    is_confirmed: boolean
}

interface DestinationAndDateHeader{
    tripInfo: Trip | undefined
}

export function DestinationAndDateHeader({
    tripInfo
}:DestinationAndDateHeader) {
    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin size-5 text-zinc-400 />
                <span className=" text-zinc-100">{tripInfo?.destination}</span>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar size-5 text-zinc-400 />
                    <span className=" text-zinc-100">17 a 20 Agosto</span>
                </div>
                <div className="w-px h-6 bg-zinc-800" />
                <Button variant="secondary">
                    Alterar local/data
                    <Settings2/>
                </Button>
            </div>
        </div>
    )
}