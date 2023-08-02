import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart, resetVoucher } from "../redux/slices/dataSlice";
import { api } from "../utils/api";
import { formatPrice } from "../utils/util";

const TotalSection = ({ onClose }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.data.cartItems);
    const voucher = useSelector((state) => state.data.voucher);
    const [total, setTotal] = useState(0);

    const getTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.harga * item.qty;
        });

        if (voucher) {
            const diff = total - voucher.nominal;
            if (diff < 0) {
                total = 0;
            } else {
                total = diff;
            }
        }
        setTotal(total);
    };

    useEffect(() => {
        getTotal();
    }, [voucher, cartItems]);

    const onSubmitOrder = async () => {
        try {
            const items = cartItems.map((item) => ({
                id: item.id,
                harga: item.harga,
                catatan: item.catatan,
            }));
            let payload = {
                nominal_diskon: voucher ? voucher.nominal : 0,
                nominal_pesanan: total,
                items,
            };
            if (voucher) payload = { ...payload, voucher_id: voucher.id };
            const res = await api.post("/order", payload);
            if (res.data.status !== 200) throw new Error(res.data.message);
            dispatch(resetCart());
            dispatch(resetVoucher());
        } catch (error) {
            console.log(error);
        } finally {
            onClose();
        }
    };

    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-solid border-t border-gray-200">
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-sm mb-4 text-sm font-semibold">
                <p>Total</p>
                <p>{formatPrice(total)}</p>
            </div>
            <div>
                <button
                    className="main-btn py-2"
                    onClick={onSubmitOrder}
                    disabled={!cartItems.length}
                >
                    Buat Pesanan
                </button>
            </div>
        </div>
    );
};

export default TotalSection;
