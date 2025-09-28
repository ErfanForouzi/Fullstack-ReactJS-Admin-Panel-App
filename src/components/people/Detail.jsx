import usePerson from "@/hooks/usePerson";
import { Breadcrumb, Divider, Spin } from "@/ui";
import { Link, Links, useParams } from "react-router";

export default function Detail() {
  // const [person,setPerson] = useState({})
  const { id } = useParams();

  const {person,loading} = usePerson(id);

  if(loading){
    return <Spin fullscreen/>
  }

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title:<Link to={'/people'}>کاربران</Link>,
          },
          {
            title: ":id",
            href: "",
          },
        ]}
        params={{ id }}
      />
      <h2>{person.name}</h2>
      <div>Email: {person.email}</div>
      <Divider />
      <Link to={"/people"}>بازگشت به لیست</Link>
    </div>
  );
}
