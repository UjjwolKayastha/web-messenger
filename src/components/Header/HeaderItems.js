import { Button, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

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
      href: "/logout",
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
          }}
        >
          {label}
        </Button>
      )
    );
  });
};