export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-black text-white -mx-2 sm:-mx-6 -my-8 px-6 md:px-16 py-12 md:py-20 flex flex-col items-center">
            <div className="max-w-3xl w-full">
                <h1 className="font-['Bebas_Neue'] text-4xl md:text-6xl font-bold mb-8 text-left border-b border-white/10 pb-4">
                    <span className="text-red-600">REFUND</span> POLICY
                </h1>
                <div className="font-['Space_Grotesk'] flex flex-col gap-6 text-base md:text-lg leading-relaxed text-gray-300">
                    <p>
                        All ticket purchases made for <strong className="text-white">TEDxIITPatna</strong> are final. Once a ticket has been purchased, it cannot be cancelled, refunded, or exchanged under any circumstances.
                    </p>
                    <p>
                        No requests for refunds or cancellations will be entertained, including but not limited to inability to attend the event due to personal reasons, travel disruptions, medical emergencies, or unforeseen circumstances.
                    </p>
                    <p className="font-medium text-white pt-2">
                        By purchasing a ticket, the purchaser acknowledges and agrees to abide by this Refund Policy.
                    </p>
                </div>
            </div>
        </div>
    );
}