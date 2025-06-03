import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase/";

const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totlaItem = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section section className={classes.sticky}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            {/* logo */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon logo"
              />
            </Link>

            {/* delivery */}
            <div className={classes.delivery}>
              <span>
                <IoLocationOutline />
              </span>
              <div>
                <p>Deliver to </p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* serch bar */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="Search products" />
            <FaSearch size={39} />
          </div>
          {/* order section  */}
          <div className={classes.order_container}>
            <Link to="#" className={classes.language}>
              {" "}
              {/* right side link */}
              <img
                src="https://pngimg.com/uploads/flags/small/flags_PNG14592.png"
                alt="USA Flag"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}> Sign Out </span>
                  </>
                ) : (
                  <>
                    <p> Hello, Sign In</p>
                    <span>Account & Lists </span>
                  </>
                )}
              </div>
            </Link>

            {/* orders */}
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="./cart" className={classes.cart}>
              <BsCart3 size={35} />
              <span>{totlaItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
