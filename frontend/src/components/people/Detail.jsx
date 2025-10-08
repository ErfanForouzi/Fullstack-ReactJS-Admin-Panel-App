import usePerson from "@/hooks/usePerson";
import { Breadcrumb, Divider, Spin } from "@/ui";
import { Link, Links, useParams } from "react-router";

export default function Detail() {
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
      <h2>{person?.username}</h2>
      <Divider />
      <Link to={"/people"}>بازگشت به لیست</Link>
    </div>
  );
}
