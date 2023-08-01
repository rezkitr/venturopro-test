import { useSelector } from "react-redux";
import BrandLogo from "./BrandLogo";

const HeaderBar = ({ onShowCart }) => {
    const cartItems = useSelector((state) => state.data.cartItems);
    return (
        <div className="flex items-center justify-between text-base font-semibold">
            <BrandLogo />
            <div className="relative">
                <button
                    className="flex items-center gap-2 border border-slate-400 px-4 py-1 rounded-md"
                    onClick={onShowCart}
                >
                    <i
                        className="fa fa-shopping-cart text-slate-500"
                        aria-hidden="true"
                    />
                    <p className="text-sm">Keranjang</p>
                </button>
                <div className="absolute right-[-8px] top-[-8px] bg-red-800 text-white text-xs flex items-center justify-center w-5 h-5 rounded-full">
                    {cartItems.length}
                </div>
            </div>
        </div>
    );
};

export default HeaderBar;
