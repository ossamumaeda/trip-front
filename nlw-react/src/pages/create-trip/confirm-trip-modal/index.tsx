import { Plus, User, X } from "lucide-react";
import { FormEvent } from "react";

interface ConfirmTripModal {
    closeConfirmTripModal: () => void;
    createTrip: (event: FormEvent<HTMLFormElement>) => void;
    setOwnerName: (name: string) => void;
    setOwnerEmail: (email: string) => void;
}


export function ConfirmTripModal({
    closeConfirmTripModal,
    createTrip,
    setOwnerEmail,
    setOwnerName
}: ConfirmTripModal) {



    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Confirmar criação da viagem</h2>
                        <button onClick={closeConfirmTripModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <p className="text-sm text-zinc-400">
                        Para concluir a criação da viagem à <span className="font-semibold text-zinc-100">Floripa,Brasil </span>
                        <span className="font-semibold text-zinc-100">nas datas de 16 a 20 de agosto de 2024</span>
                    </p>
                </div>

                <form onSubmit={createTrip} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <User className="text-zinc-400 size-5" />
                        <input
                            onChange={event => setOwnerName(event.target.value)}
                            type="text"
                            name="name"
                            placeholder="Seu nome completo"
                            className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                        />
                    </div>
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <User className="text-zinc-400 size-5" />
                        <input
                            onChange={event => setOwnerEmail(event.target.value)}
                            type="text"
                            name="email"
                            placeholder="Seu email pessoal"
                            className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="justify-center w-full bg-lime-300 text-lime-950 rounded-lg px-5 h-10 font-medium flex items-center gap-2 hover:bg-lime-500">
                        Confirmar criação da viagem
                        <Plus className="size-5" />
                    </button>
                </form>
            </div>
        </div>
    )
}