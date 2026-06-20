export default function RefundPolicy() {
    return (
        <div className="relative min-h-screen text-white px-8 md:px-16 py-12" style={{
            backgroundImage: `url('/images/bg1.png')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="font-['Bebas_Neue'] text-5xl md:text-8xl font-bold mb-12 text-center">
                    <span className="text-red-600">REFUND</span> POLICY
                </h1>
                <div className="font-['Space_Grotesk'] flex flex-col gap-4 text-base md:text-lg leading-relaxed items-start">
                    <p>Lorem ipsum dolor sit amet consectetur. Feugiat arcu viverra nisi quam sed morbi blandit aliquam. Aliquam sem iaculis sed nisl duis cras. Sed nunc ac malesuada mattis dictum condimentum. Ullamcorper consectetur mauris eu tristique risus.</p>
                    <p>Lorem ipsum dolor sit amet consectetur. Feugiat arcu viverra nisi quam sed morbi blandit aliquam. Aliquam sem iaculis sed nisl duis cras. Sed nunc ac malesuada mattis dictum condimentum. Ullamcorper consectetur mauris eu tristique risus.</p>
                    <p>Lorem ipsum dolor sit amet consectetur. Feugiat arcu viverra nisi quam sed morbi blandit aliquam. Aliquam sem iaculis sed nisl duis cras. Sed nunc ac malesuada mattis dictum condimentum. Ullamcorper consectetur mauris eu tristique risus.</p>
                </div>
            </div>
        </div>
    );
}