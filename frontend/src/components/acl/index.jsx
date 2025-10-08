import { useSelector } from "react-redux";

export function acl(Component) {
  return function ({ role, ...props }) {
    const user = useSelector((state) => state.user);
    console.log("____________________");
    console.log({
      roleUser: user.role,
      role,
    });
    if (role) {
      if (role === user?.role) {
        return <Component {...props} />;
      } else {
        return null;
      }
    } else {
      return <Component {...props} />;
    }
  };
}
