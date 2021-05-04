import { Button, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../../redux";

const useStyles = makeStyles(() => ({
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: 50,
  },
}));

export const MenuItems = () => {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout(auth.uid));
  };

  const headersData = [
    !auth.authenticated
      ? [
          {
            label: "Login",
            href: "/login",
          },

          {
            label: "Sign Up",
            href: "/signup",
          },
        ]
      : {},
    {
      label: "Logout",
    },
  ];
  return headersData.map(({ label, href }) => {
    return (
      label !== null && (
        <Button
          {...{
            key: label ? label : Math.random(),
            color: "inherit",
            to: href ? href : "#",
            component: RouterLink,
            className: classes.menuButton,
            onClick: label === "Logout" ? logOut : () => {},
          }}
        >
          {label}
        </Button>
      )
    );
  });
};
