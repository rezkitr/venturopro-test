import { useDispatch } from "react-redux";
import { addQty, subQty } from "../redux/slices/dataSlice";

const QtyButton = ({ qty, id }) => {
    const dispatch = useDispatch();
    return (
        <div className="flex items-center w-20 h-4 border border-red-400">
            <button
                className="bg-slate-500 rounded-sm min-w-[16px] text-white"
                onClick={() => dispatch(subQty(id))}
                disabled={qty <= 1}
            >
                -
            </button>
            <div className="px-4">{qty}</div>
            <button
                className="bg-slate-500 rounded-sm min-w-[16px] text-white"
                onClick={() => dispatch(addQty(id))}
            >
                +
            </button>
        </div>
    );
};

export default QtyButton;
