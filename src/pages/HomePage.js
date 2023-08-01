import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartPopup, HeaderBar, MenuCard } from "../components";
import { getMenus } from "../redux/slices/dataSlice";

const HomePage = () => {
    const menus = useSelector((state) => state.data.menus);
    const dispatch = useDispatch();
    const [showCartPopup, setShowCartPopup] = useState(false);

    useEffect(() => {
        dispatch(getMenus());
    }, []);

    const onShowCartPopup = () => setShowCartPopup(true);
    const onCloseCartPopup = () => setShowCartPopup(false);

    return (
        <>
            <div>
                <HeaderBar onShowCart={onShowCartPopup} />
                <div className="mt-6 grid grid-cols-6 gap-3">
                    {menus.map((menu) => (
                        <MenuCard key={menu.id} menu={menu} />
                    ))}
                </div>
            </div>
            {showCartPopup && <CartPopup onClose={onCloseCartPopup} />}
        </>
    );
};

export default HomePage;
