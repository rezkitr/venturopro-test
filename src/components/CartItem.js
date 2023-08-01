import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editNote } from "../redux/slices/dataSlice";
import { formatPrice } from "../utils/util";
import QtyButton from "./QtyButton";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const [note, setNote] = useState(item.note);

    useEffect(() => {
        dispatch(editNote({ id: item.id, note }));
    }, [note]);

    return (
        <div>
            <div className="flex items-end gap-2">
                <div className="flex-1 flex gap-2 items-center">
                    <div className="w-16 h-16 rounded-md overflow-hidden">
                        <img
                            src={item.gambar}
                            alt="item"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <p className="font-semibold mb-1">{item.nama}</p>
                        <p className="font-semibold text-slate-500 text-xs mb-2">
                            {formatPrice(item.harga)}
                        </p>
                        <p className="text-xs truncate">{note}</p>
                    </div>
                </div>
                <QtyButton qty={item.qty} id={item.id} />
            </div>
            <div className="mt-3">
                <input
                    type="text"
                    placeholder="Masukkan catatan di sini"
                    className="w-full bg-transparent border border-gray-300 rounded-md px-2 py-1 focus:outline-none text-sm"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>
        </div>
    );
};

export default CartItem;
