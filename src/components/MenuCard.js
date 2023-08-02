import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/dataSlice";
import { formatPrice } from "../utils/util";

const MenuCard = ({ menu }) => {
    const dispatch = useDispatch();

    const onAddToCart = () => {
        dispatch(addToCart(menu));
    };

    return (
        <div className="p-3 w-full bg-white">
            <div className="w-full h-32 border border-red-400 mb-3">
                <img
                    src={menu.gambar}
                    alt="menu"
                    className="object-contain w-full h-full"
                />
            </div>
            <p className="text-sm font-semibold mt-1 truncate">{menu.nama}</p>
            <p className="text-sm font-semibold text-slate-500 mb-3">
                {formatPrice(menu.harga)}
            </p>
            <button
                className="main-btn text-xs py-1 px-4"
                onClick={onAddToCart}
            >
                <i className="fa fa-plus mr-1 text-xs" aria-hidden="true" />{" "}
                <span>Tambahkan ke Keranjang</span>
            </button>
        </div>
    );
};

export default MenuCard;
