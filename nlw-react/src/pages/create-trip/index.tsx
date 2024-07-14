import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
export function CreateTripPage() {

    const navigate = useNavigate();
    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
    const [emailsInvite, setEmailsInvite] = useState(["maeda@gmail.com"]);
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);


    const [destination, setDestination] = useState('');
    const [ownerName, setOwnername] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [eventDate, setEventDate] = useState<DateRange | undefined>();


    function openGuestInput() {
        setIsGuestsInputOpen(true);
    }

    function closeGuestInput() {
        setIsGuestsInputOpen(false);
    }

    function openGuestModal() {
        setIsGuestsModalOpen(true);
    }

    function closeGuestModal() {
        setIsGuestsModalOpen(false);
    }

    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true);
    }

    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false);
    }

    function addNewEmailInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const email = data.get('email')?.toString();
        if (!email) { return }
        if (emailsInvite.includes(email)) { return }

        setEmailsInvite([...emailsInvite, email])

        event.currentTarget.reset();
    }

    function removeEmailInvite(emailRemove: string) {
        if (!emailRemove) { return }
        const newEmailList = emailsInvite.filter(e => e !== emailRemove);
        setEmailsInvite(newEmailList);
    }

    async function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(destination)
        console.log(ownerName)
        console.log(ownerEmail)
        console.log(eventDate)


        if (!destination) { return }
        if (!eventDate?.from || !eventDate?.to) { return }
        if (emailsInvite.length == 0) { return }
        if (!ownerEmail || !ownerName) { return }

        const response = await api.post('/trips',
            {
                destination,
                starts_at: eventDate.from,
                ends_at: eventDate.to,
                owner_name: ownerName,
                owner_email: ownerEmail,
                emails_to_invite: emailsInvite
            }
        )

        const { trip_id } = response.data
        navigate(`/details/${trip_id}`);

    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center gap-3">
                    <img src="/logo.svg" alt="plann.er" />
                    <p className="text-zinc-300 text-lg">
                        Convide seus amigos e planeje sua próxima viagem!
                    </p>
                </div>
                <div className="space-y-4">
                    <DestinationAndDateStep
                        closeGuestInput={closeGuestInput}
                        isGuestsInputOpen={isGuestsInputOpen}
                        openGuestInput={openGuestInput}
                        setDestination={setDestination}
                        setEventDate={setEventDate}
                        eventDate={eventDate}
                    />

                    {isGuestsInputOpen && (
                        <InviteGuestsStep
                            emailsInvite={emailsInvite}
                            openConfirmTripModal={openConfirmTripModal}
                            openGuestModal={openGuestModal}
                        />
                    )}
                </div>

                <p className="text-sm text-zinc-500 ">
                    Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
                    com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade.</a>
                </p>

            </div>
            {isGuestsModalOpen &&
                <InviteGuestsModal
                    emailsInvite={emailsInvite}
                    addNewEmailInvite={addNewEmailInvite}
                    closeGuestModal={closeGuestModal}
                    removeEmailInvite={removeEmailInvite}
                />
            }

            {isConfirmTripModalOpen &&
                <ConfirmTripModal
                    closeConfirmTripModal={closeConfirmTripModal}
                    createTrip={createTrip}
                    setOwnerName={setOwnername}
                    setOwnerEmail={setOwnerEmail}
                />
            }
        </div>
    )
}

