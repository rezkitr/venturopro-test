import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVoucher, resetVoucher } from "../redux/slices/dataSlice";
import BrandLogo from "./BrandLogo";
import CartItem from "./CartItem";
import TotalSection from "./TotalSection";

const CartPopup = ({ onClose }) => {
    const cartItems = useSelector((state) => state.data.cartItems);
    const voucher = useSelector((state) => state.data.voucher);
    const dispatch = useDispatch();
    const [voucherCode, setVoucherCode] = useState("");

    const closePopup = () => {
        onClose();
        dispatch(resetVoucher());
    };

    const onCheckVoucher = (e) => {
        if (e.key === "Enter") {
            console.log("Check voucher");
            dispatch(getVoucher({ code: voucherCode }));
        }
    };

    return (
        <div className="absolute inset-0 bg-gray-800/40 flex justify-end">
            <div className="bg-white w-[400px] h-full p-4 relative">
                <div className="flex items-center justify-between border-solid border-b border-gray-200 pb-3 mb-4">
                    <BrandLogo />
                    <i
                        className="fa fa-times cursor-pointer"
                        aria-hidden="true"
                        onClick={closePopup}
                    />
                </div>
                <div className="flex flex-col gap-3 border-solid border-b border-gray-200 pb-6 mb-4">
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
                {!!cartItems.length && (
                    <div className="text-xs">
                        <p>
                            <i
                                className="fa fa-qrcode text-slate-500 mr-1"
                                aria-hidden="true"
                            />
                            <span>Tambah Voucher</span>
                        </p>
                        <div className="mt-1">
                            <input
                                type="text"
                                placeholder="Masukkan vouchermu di sini"
                                className="w-full bg-transparent border border-gray-300 rounded-md px-2 py-1 focus:outline-none text-sm"
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                                onKeyDown={onCheckVoucher}
                                disabled={voucher}
                            />
                        </div>
                    </div>
                )}
                <TotalSection onClose={onClose} />
            </div>
        </div>
    );
};

export default CartPopup;
