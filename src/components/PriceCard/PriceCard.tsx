import checkmark from '../../assets/Checkmark.svg';

interface PriceCardProps {
    name: string;
    description: string;
    btnText?: string;
    price?: string;
    features: string[];
    color: string;
}

export const PriceCard = ({name, description, price, features, color, btnText='Start Trial',}: PriceCardProps) => {
  return (
    <div className={`flex min-h-[428px] w-[320px] flex-col rounded-3xl p-8 ${color}`}>
        <h2 className="mb-5 text-xl font-medium">{name}</h2>
        <div className="mb-5 flex items-end text-6xl font-black">
            {price ? (
                <div>${price}</div>
            ) : (
                'Free'
            )}
        </div>
        <p className="mb-5">{description}</p>
        <ul className="mb-10 flex flex-col gap-y-2">
            {features.map((feature) => (
                <li className="flex items-center">
                    {<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 64 64">
                        <path fill="#060000" d="M32,10c12.131,0,22,9.869,22,22s-9.869,22-22,22s-22-9.869-22-22S19.869,10,32,10z M42.362,28.878	c0.781-0.781,0.781-2.047,0-2.828c-0.781-0.781-2.047-0.781-2.828,0l-9.121,9.121l-5.103-5.103c-0.781-0.781-2.047-0.781-2.828,0	c-0.781,0.781-0.781,2.047,0,2.828l6.517,6.517C29.374,39.789,29.883,40,30.413,40s1.039-0.211,1.414-0.586L42.362,28.878z"></path>
                     </svg>
                    }
                    {feature}
                </li>
            ))}
        </ul>
        
        <button className="mt-auto rounded-full bg-elite-black py-3 px-6 text-lg font-medium text-lite-gray">
            {btnText}
        </button>
    </div>
  )
}
